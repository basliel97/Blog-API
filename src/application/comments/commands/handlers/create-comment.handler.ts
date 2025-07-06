import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../create-comment.command';
import { CommentRepository } from '../../../../domain/repositories/comment.repository';
import { COMMENT_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Comment } from '../../../../domain/entities/comment.entity';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';

@Injectable()
@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: CreateCommentCommand): Promise<any> {
    // Verify that the post exists
    const post = await this.postRepository.findById(command.postId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${command.postId} not found`);
    }

    const comment = Comment.create(
      command.content,
      command.postId,
      command.authorId,
    );

    const savedComment = await this.commentRepository.create(comment);
    
    return {
      id: savedComment.id,
      content: savedComment.content,
      postId: savedComment.postId,
      authorId: savedComment.authorId,
      author: savedComment.author ? {
        id: savedComment.author.id,
        username: savedComment.author.username,
        email: savedComment.author.email,
      } : null,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
    };
  }
} 