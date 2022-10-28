import { Address } from '@prisma/client';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  address?: Address;
}
