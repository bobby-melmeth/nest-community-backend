import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './CommentDto/createComment.dto';
import { DeleteCommentDto } from './CommentDto/DeleteComment.dto';

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

  @Delete(':id')
  async deleteComment(
    @Param('id') id: string,
    @Body()
    deleteCommentDto: DeleteCommentDto,
  ) {
    return this.commentService.deleteComment(deleteCommentDto);
  }
}
