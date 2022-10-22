import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findMe(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id });
  }
  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
