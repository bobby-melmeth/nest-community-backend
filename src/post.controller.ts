import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreatePostDto } from './dto';

@Controller('posts')
export class PostsController {
  //create a post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return 'this action adds a new post';
  }

  // get all posts
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all posts';
  }

  // add route params
  @Get(':id')
  findOne(@Param('postId') postId: string): string {
    console.log(postId);
    return `this action returns a #${postId} post`;
  }
}
