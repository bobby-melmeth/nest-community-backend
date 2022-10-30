import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteCommentDto } from './CommentDto/DeleteComment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }
  async deleteComment(deleteCommentDto: DeleteCommentDto) {
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: deleteCommentDto.userId,
      },
    });
    if (!isUser) {
      throw new BadRequestException('users can only delete their own posts');
    }
    await this.prisma.comment.delete({
      where: {
        id: deleteCommentDto.commentId,
      },
    });
    return { message: 'Comment deleted' };
  }
  async isCommentOwnedByUser(jwtUserId: string, commentId: string) {
    const commentOwner = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (commentOwner.userId !== jwtUserId) {
      return false;
    }
    return true;
  }
}
