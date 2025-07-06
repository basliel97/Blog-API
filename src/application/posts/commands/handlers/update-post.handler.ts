import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { UpdatePostCommand } from '../update-post.command';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Post } from '../../../../domain/entities/post.entity';

@Injectable()
@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: UpdatePostCommand): Promise<Post> {
    const existingPost = await this.postRepository.findById(command.id);
    
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${command.id} not found`);
    }

    if (existingPost.authorId !== command.authorId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    const updatedPost = existingPost.update(command.title, command.content);
    return this.postRepository.update(updatedPost);
  }
} 