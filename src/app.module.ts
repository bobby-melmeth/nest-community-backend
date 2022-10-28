import { Module } from '@nestjs/common';
import { PostModule } from './Posts/post.module';
import { UserModule } from './User/user.module';
import { CommentModule } from './Comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostModule, CommentModule, AuthModule],
})
export class AppModule {}
