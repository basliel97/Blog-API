import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostOrmEntity } from '../../infrastructure/database/entities/post.orm-entity';
import { PostRepositoryImpl } from '../../infrastructure/database/repositories/post.repsitory.ipml';
import { PostRepository } from '../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../domain/repositories/tokens';

// Command Handlers
import { CreatePostHandler } from '../../application/posts/commands/handlers/create-post.handler';
import { UpdatePostHandler } from '../../application/posts/commands/handlers/update-post.handler';
import { DeletePostHandler } from '../../application/posts/commands/handlers/delete-post.handler';

// Query Handlers
import { GetAllPostsHandler } from '../../application/posts/queries/handlers/get-all-posts.handler';
import { GetPostByIdHandler } from '../../application/posts/queries/handlers/get-post-by-id.handler';

const CommandHandlers = [
  CreatePostHandler,
  UpdatePostHandler,
  DeletePostHandler,
];

const QueryHandlers = [
  GetAllPostsHandler,
  GetPostByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PostOrmEntity]),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: PostRepositoryImpl,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [POST_REPOSITORY],
})
export class PostModule {}
