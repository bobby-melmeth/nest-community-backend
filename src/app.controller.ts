import { Controller } from '@nestjs/common';
import { UserController } from './User/user.controller';
import { PostsController } from './Posts/post.controller';

@Controller()
export class AppController {
  constructor(
    private readonly postController: PostsController,
    private readonly userController: UserController,
  ) {}
}
