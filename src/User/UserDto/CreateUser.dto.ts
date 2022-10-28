import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name must be included' })
  firstName: string;

  @IsNotEmpty({ message: 'name must be included' })
  lastName: string;

  @IsNotEmpty({ message: 'email must be included' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
