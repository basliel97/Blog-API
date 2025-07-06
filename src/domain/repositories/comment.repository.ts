import { Comment } from '../entities/comment.entity';

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>;
  findById(id: number): Promise<Comment | null>;
  findByPostId(postId: number): Promise<Comment[]>;
  findByAuthorId(authorId: number): Promise<Comment[]>;
  findAll(): Promise<Comment[]>;
  update(comment: Comment): Promise<Comment>;
  delete(id: number): Promise<boolean>;
} 