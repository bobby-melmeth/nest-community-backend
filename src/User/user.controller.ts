import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, User as UserModel } from '@prisma/client';
import { Validate } from 'class-validator';
import { CreateUserDto } from 'src/User/UserDto/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findMe(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id });
  }
  @Post()
  @UsePipes(ValidationPipe)
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
