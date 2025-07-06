import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  findByAuthorId(authorId: number): Promise<Post[]>;
  searchByTitleOrContent(searchTerm: string): Promise<Post[]>;
  update(post: Post): Promise<Post>;
  delete(id: number): Promise<boolean>;
}
