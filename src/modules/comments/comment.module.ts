import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentOrmEntity } from '../../infrastructure/database/entities/comment.orm-entity';
import { PostOrmEntity } from '../../infrastructure/database/entities/post.orm-entity';
import { UserOrmEntity } from '../../infrastructure/database/entities/user.orm-entity';
import { CommentRepositoryImpl } from '../../infrastructure/database/repositories/comment.repository.impl';
import { PostRepositoryImpl } from '../../infrastructure/database/repositories/post.repsitory.ipml';
import { COMMENT_REPOSITORY, POST_REPOSITORY } from '../../domain/repositories/tokens';

// Command Handlers
import { CreateCommentHandler } from '../../application/comments/commands/handlers/create-comment.handler';

// Query Handlers
import { GetCommentsByPostHandler } from '../../application/comments/queries/handlers/get-comments-by-post.handler';

const CommandHandlers = [
  CreateCommentHandler,
];

const QueryHandlers = [
  GetCommentsByPostHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CommentOrmEntity, PostOrmEntity, UserOrmEntity]),
  ],
  controllers: [CommentController],
  providers: [
    {
      provide: COMMENT_REPOSITORY,
      useClass: CommentRepositoryImpl,
    },
    {
      provide: POST_REPOSITORY,
      useClass: PostRepositoryImpl,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [COMMENT_REPOSITORY],
})
export class CommentModule {}
