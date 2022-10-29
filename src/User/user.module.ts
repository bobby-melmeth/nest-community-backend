import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostService } from 'src/Posts/post.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PostService,
    PrismaService,
    JwtStrategy,
    AuthService,
    JwtService,
  ],
})
export class UserModule {}
