import { Injectable } from '@nestjs/common';

import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private tagService: TagsService) {}

  async getPostById(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  async getAllPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        comments: true,
      },
    });
  }

  async createPost(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    const createdTags = await this.tagService.createMultipleTags(
      createPostDto.tags,
    );

    const post = await this.prisma.post.create({
      data: {
        title: createPostDto.title,
        userId: createPostDto.userId,
        content: createPostDto.content,
        tags: {
          connect: createdTags,
        },
      },
    });
    return post;
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(data: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id: data.id,
      },
    });
  }
  async isPostOwnedByUser(jwtUserId: string, postId: string) {
    const postOwner = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (postOwner.userId !== jwtUserId) {
      return false;
    }
    return true;
  }
}
