import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { DeletePostCommand } from '../delete-post.command';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';

@Injectable()
@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: DeletePostCommand): Promise<void> {
    const existingPost = await this.postRepository.findById(command.id);
    
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${command.id} not found`);
    }

    if (existingPost.authorId !== command.authorId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    const deleted = await this.postRepository.delete(command.id);
    if (!deleted) {
      throw new Error('Failed to delete post');
    }
  }
} 