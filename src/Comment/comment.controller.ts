import { Body, Controller, Post } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body()
    commentData: {
      content: string;
      author?: Prisma.UserCreateNestedOneWithoutCommentsInput;
      post: Prisma.PostCreateNestedOneWithoutCommentsInput;
    },
  ): Promise<Comment> {
    return this.commentService.createComment(commentData);
  }
}
