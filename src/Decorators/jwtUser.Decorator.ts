import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const jwtUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
