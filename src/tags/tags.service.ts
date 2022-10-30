import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Tag } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const foundTag = this.prisma.tag.findUnique({
      where: {
        title: createTagDto.title,
      },
    });
    if (!foundTag)
      try {
        const tag = await this.prisma.tag.upsert({
          where: {
            title: createTagDto.title,
          },
          create: {
            title: createTagDto.title,
          },
          update: {},
        });
        return tag;
      } catch (error) {
        throw new HttpException('Failed to create tag', HttpStatus.BAD_REQUEST);
      }
  }

  async createMultipleTags(tagList: Tag[]) {
    const createdTags = await this.prisma.$transaction(
      tagList.map((tag) =>
        this.prisma.tag.upsert({
          where: {
            title: tag.title,
          },
          create: {
            title: tag.title,
          },
          select: {
            id: true,
          },
          update: {},
        }),
      ),
    );
    return createdTags;
  }
  async getAllTags(params: {
    skip?: number;
    take?: number;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: string): Promise<Tag> {
    return this.prisma.tag.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
