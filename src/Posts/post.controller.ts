import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { jwtUser } from 'src/Decorators/jwtUser.Decorator';

import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from 'src/Posts/PostsDto/CreatePost.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ParamPipe } from 'src/Pipes/param.pipe';
import { UserService } from 'src/User/user.service';

@Controller('post')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  async createPost(@Body() postData: CreatePostDto) {
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(
    @jwtUser() jwtUser,
    @Param('id', new ParamPipe('postId')) id: string,
  ) {
    const isPostOwned = await this.postService.isPostOwnedByUser(
      jwtUser.id,
      id,
    );
    if (isPostOwned === false) {
      throw new HttpException(
        'This is not your post to delete!',
        HttpStatus.BAD_REQUEST,
      );
    }
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
