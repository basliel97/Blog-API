import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, Inject } from '@nestjs/common';
import { GetCommentsByPostQuery } from '../get-comments-by-post.query';
import { CommentRepository } from '../../../../domain/repositories/comment.repository';
import { COMMENT_REPOSITORY } from '../../../../domain/repositories/tokens';
import { Comment } from '../../../../domain/entities/comment.entity';

@Injectable()
@QueryHandler(GetCommentsByPostQuery)
export class GetCommentsByPostHandler implements IQueryHandler<GetCommentsByPostQuery> {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(query: GetCommentsByPostQuery): Promise<any[]> {
    const comments = await this.commentRepository.findByPostId(query.postId);
    
    return comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      postId: comment.postId,
      authorId: comment.authorId,
      author: comment.author ? {
        id: comment.author.id,
        username: comment.author.username,
        email: comment.author.email,
      } : null,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));
  }
} 