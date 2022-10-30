import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ParamPipe } from 'src/Pipes/param.pipe';
import { DeleteLikeDto } from './dto/DeleteLike.dto';
import { jwtUser } from 'src/Decorators/jwtUser.Decorator';
import { PrismaService } from 'prisma/prisma.service';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  async remove(
    @jwtUser() jwtUser,
    @Param('id', new ParamPipe('postId')) id: string,
    @Body() deleteLikeDto: DeleteLikeDto,
  ) {
    const postUser = await this.prisma.post.findUnique({
      where: { id: id },
      select: { userId: true },
    });
    return this.likesService.remove(deleteLikeDto, id);
  }
}
