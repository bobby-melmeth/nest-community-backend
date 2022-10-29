import { User } from '@prisma/client';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Post must have content' })
  @Length(1, 255, { message: 'content must be between 1 and 255 characters' })
  content: string;
  userId: String;
  postId: String;
  parentId: String | null;
}
