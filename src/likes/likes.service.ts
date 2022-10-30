import { Injectable } from '@nestjs/common';
import { Like } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/DeleteLike.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto) {
    return await this.prisma.like.create({
      data: {
        postId: createLikeDto.postId,
        userId: createLikeDto.userId,
      },
    });
  }

  async findAll() {
    return `This action returns all likes`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  async remove(deleteLikeDto: DeleteLikeDto, id: string): Promise<Like> {
    return await this.prisma.like.delete({
      where: {
        userId_postId: {
          userId: deleteLikeDto.userId,
          postId: deleteLikeDto.postId,
        },
      },
    });
  }
}
