import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() postData: { content: string; title: string },
  ): Promise<PostModel> {
    return this.postService.createPost(postData);
  }
  @Get()
  async getPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts({});
  }

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.getPostById({ id: String(id) });
  }
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: String(id) });
  }
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body()
    postData: {
      title?: string;
      content?: string;
      id?: string;
      published?: boolean;
    },
  ): Promise<PostModel> {
    return this.postService.updatePost({
      data: postData,
      where: { id: String(id) },
    });
  }
}
