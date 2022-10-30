import { Module } from '@nestjs/common';
import { PostModule } from './Posts/post.module';
import { UserModule } from './User/user.module';
import { CommentModule } from './Comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';

@Module({
  providers: [],
  imports: [UserModule, PostModule, CommentModule, AuthModule, TagsModule],
})
export class AppModule {}
