import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignUpDto } from './authDto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './authDto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const { email, password, firstName, lastName, mobile, address } =
        signUpDto;

      const hashedPassword = await this.hashPassword(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          mobile,
          password: hashedPassword,
          address: {
            create: {
              country: address.country,
              postCode: address.postCode,
              state: address.state,
              suburb: address.suburb,
            },
          },
        },
      });
      return 'User successfully signed up!';
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Registration Failed, Please try again..!!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!foundUser) {
      throw new BadRequestException('wrong credentials');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.password,
    });
    if (!isMatch) {
      throw new BadRequestException('wrong credentials');
    }
    // Sign JWT and return token to user
    const jwtToken = await this.signToken({
      email: foundUser.email,
      id: foundUser.id,
    });
    console.log('token', jwtToken);
    if (!jwtToken) {
      throw new ForbiddenException();
    }

    res.cookie('token', jwtToken);

    return res.send({ message: 'Logged in Successfully', token: jwtToken });
  }
  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfully' });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
