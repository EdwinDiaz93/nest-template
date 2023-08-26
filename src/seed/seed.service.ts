import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {

  }

  async runSeed() {

    await this.deleteAllTables();

    const adminUser = await this.insertUsers();

    await this.insertNewProducts(adminUser);

    return 'Seed Executed';
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = seedUsers.map(user => this.userRepository.create(user));

    const dbUsers=await this.userRepository.save(users);
    return dbUsers[0];
  }

  private async deleteAllTables() {

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();

  }

  private async insertNewProducts(user: User) {


    const products = initialData.products;

    const insertPromises = [];

    for (const product of products) {
      insertPromises.push(
        this.productsService.create(product, user),
      )
    }
    await Promise.all(insertPromises);
  }
}
