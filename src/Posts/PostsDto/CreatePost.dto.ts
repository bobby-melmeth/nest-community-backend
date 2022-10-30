import { Tag, User } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Post must have a title' })
  @Length(1, 255, { message: 'Title length must not exceed 30 characters' })
  title: string;
  @IsNotEmpty({ message: 'Post must have content' })
  @Length(1, 255, { message: 'content must be between 1 and 255 characters' })
  content: string;
  userId: string;
}
