import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from 'src/utils/constants';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  //   private static extractJWT(req: Request): string | null {
  //     if (req.cookies && 'token' in req.cookies) {
  //       console.log('request.cokies', req.cookies);
  //       return req.cookies;
  //     }
  //     return null;
  //   }

  async validate(payload: { id: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return payload;
  }
}
