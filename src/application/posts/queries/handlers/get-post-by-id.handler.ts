import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { GetPostByIdQuery } from '../get-post-by-id.query';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Post } from '../../../../domain/entities/post.entity';

@Injectable()
@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(query: GetPostByIdQuery): Promise<any> {
    const post = await this.postRepository.findById(query.id);
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${query.id} not found`);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      author: post.author ? {
        id: post.author.id,
        username: post.author.username,
        email: post.author.email,
      } : null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
} 