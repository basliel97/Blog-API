import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { CreatePostCommand } from '../create-post.command';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Post } from '../../../../domain/entities/post.entity';

@Injectable()
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    const post = Post.create(
      command.title,
      command.content,
      command.authorId,
    );

    const savedPost = await this.postRepository.create(post);
    
    return {
      id: savedPost.id,
      title: savedPost.title,
      content: savedPost.content,
      authorId: savedPost.authorId,
      author: savedPost.author ? {
        id: savedPost.author.id,
        username: savedPost.author.username,
        email: savedPost.author.email,
      } : null,
      createdAt: savedPost.createdAt,
      updatedAt: savedPost.updatedAt,
    };
  }
} 