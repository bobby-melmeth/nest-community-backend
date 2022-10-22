import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { User as UserModel, Post as PostModel, Prisma } from '@prisma/client';
import { UpdatePostDto } from './dto';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  @Post('post')
  async createPost(
    @Body() postData: { content: string; title: string },
  ): Promise<PostModel> {
    return this.postService.createPost(postData);
  }
  @Get('posts')
  async getPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts({});
  }

  @Get('post/:id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.getPostById({ id: String(id) });
  }
  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: String(id) });
  }

  @Put('post/:id')
  async updatePost(
    @Param('id') id: string,
    @Body()
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
