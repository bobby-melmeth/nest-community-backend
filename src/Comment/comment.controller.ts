import { Body, Controller, Post } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './CommentDto/createComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Body()
    commentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(commentDto);
  }
}
