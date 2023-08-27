import { Controller, Post, Get, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { META_ROLS, RoleProtected } from './decorators/role-protected.decorator';
import { validRols } from './interfaces/valid-rols.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-token')
  @Auth()
  checkAuthStatus(
    @GetUser('id') id: string
  ) {
    return this.authService.checkAuthStatus(id);
  }

  @Get('private')
  @UseGuards(
    AuthGuard()
  )
  testingPrivateRoute(
    // @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {

    return {
      user,
      email,
      rawHeaders,
      headers,
    }
  }

  @Get('private2')
  @RoleProtected(validRols.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user,
    }
  }

  @Get('private3')
  @Auth(validRols.user)
  testingPrivateRoute3(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user,
    }
  }

}
