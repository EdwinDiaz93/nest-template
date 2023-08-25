import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        email,

      },
      select: { email: true, password: true, }
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid');

    return user;
    // TODO: return jwt
  }


  private handleDbErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(`${error.detail}`);

    console.log(error);

    throw new InternalServerErrorException('Something went wrong');
  }

}
