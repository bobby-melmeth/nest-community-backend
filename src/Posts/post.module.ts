import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TagsService } from 'src/tags/tags.service';
import { UserService } from 'src/User/user.service';

import { PostsController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostService, PrismaService, TagsService, UserService],
})
export class PostModule {}
