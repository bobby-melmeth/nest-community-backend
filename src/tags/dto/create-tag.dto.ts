import { IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  title: string;
}
