import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(private readonly productsService: ProductsService) {

  }

  async runSeed() {
    await this.productsService.deleteAllProducts();

    await this.insertNewProducts();

    return 'Seed Executed';
  }

  private async insertNewProducts() {


    const products = initialData.products;

    const insertPromises = [];

    for (const product of products) {
      insertPromises.push(
        this.productsService.create(product)
      )
    }
    await Promise.all(insertPromises);
  }
}
