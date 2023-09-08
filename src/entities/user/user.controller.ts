import { Injectable, Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Injectable()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAll(): Promise<Omit<UserEntity, 'password'>[]> {
    return this.userService.getAll();
  }

  @Get('/email/:email')
  async getByEmail(
    @Param('email') email: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.getByEmail(email);
  }

  @Post('/register')
  async registerUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.registerUser(email, password);
  }
}
