import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name must be included' })
  name: string;

  @IsNotEmpty({ message: 'email must be included' })
  @IsEmail()
  email: string;
}
