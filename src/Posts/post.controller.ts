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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from 'src/Posts/PostsDto/CreatePost.dto';

@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  // @Post()
  // @HttpCode(200)
  // @UsePipes(ValidationPipe)
  // async createPost(@Body() postData: CreatePostDto): Promise<PostModel> {
  //   return this.postService.createPost(postData);
  // }
  // @Get()
  // async getPosts(): Promise<PostModel[]> {
  //   return this.postService.getAllPosts({});
  // }

  // @Get(':id')
  // async getPost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.getPostById({ id: String(id) });
  // }
  // @Delete(':id')
  // async deletePost(@Param('id') id: string): Promise<PostModel> {
  //   return this.postService.deletePost({ id: String(id) });
  // }
  // @Put(':id')
  // async updatePost(
  //   @Param('id') id: string,
  //   @Body()
  //   postData: {
  //     title?: string;
  //     content?: string;
  //     id?: string;
  //     published?: boolean;
  //   },
  // ): Promise<PostModel> {
  //   return this.postService.updatePost({
  //     data: postData,
  //     where: { id: String(id) },
  //   });
  // }
}
