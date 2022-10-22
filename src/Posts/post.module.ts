import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostsController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
