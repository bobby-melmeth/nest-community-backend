import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, User as UserModel } from '@prisma/client';
import { Validate } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateUserDto } from 'src/User/UserDto/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findMe(@Param('id') id: string): Promise<Partial<User>> {
    return this.userService.user(id);
  }
}
