import { Module } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { AppController } from './app.controller';
import { PostsController } from './Posts/post.controller';
import { PostModule } from './Posts/post.module';
import { PostService } from './Posts/post.service';
import { UserModule } from './User/user.module';
import { UserService } from './User/user.service';

@Module({
  imports: [UserModule, PostModule],
})
export class AppModule {}
