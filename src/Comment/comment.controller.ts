import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { jwtUser } from 'src/Decorators/jwtUser.Decorator';
import { ParamPipe } from 'src/Pipes/param.pipe';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './CommentDto/createComment.dto';
import { DeleteCommentDto } from './CommentDto/DeleteComment.dto';

@UseGuards(JwtAuthGuard)
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
    @jwtUser() jwtUser,
    @Param('id', new ParamPipe('commentId')) id: string,
    @Body()
    deleteCommentDto: DeleteCommentDto,
  ) {
    const isCommentOwned = await this.commentService.isCommentOwnedByUser(
      jwtUser.id,
      id,
    );
    if (isCommentOwned === false) {
      throw new HttpException(
        'This is not your comment to delete!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.commentService.deleteComment(deleteCommentDto);
  }
}
