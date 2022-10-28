import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostService } from 'src/Posts/post.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PostService, PrismaService, JwtStrategy],
})
export class UserModule {}
