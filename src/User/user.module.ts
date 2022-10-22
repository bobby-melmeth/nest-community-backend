import { Module } from '@nestjs/common';
import { PostService } from 'src/Posts/post.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PostService, PrismaService],
})
export class UserModule {}
