import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, Inject } from '@nestjs/common';
import { GetAllPostsQuery } from '../get-all-posts.query';
import { PostRepository } from '../../../../domain/repositories/post.repository';
import { POST_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Post } from '../../../../domain/entities/post.entity';

@Injectable()
@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(query: GetAllPostsQuery): Promise<any[]> {
    let posts: Post[];
    
    if (query.searchTerm) {
      posts = await this.postRepository.searchByTitleOrContent(query.searchTerm);
    } else {
      posts = await this.postRepository.findAll();
    }
    
    return posts.map(post => ({
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
    }));
  }
} 