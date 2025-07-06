import { PostOrmEntity } from 'src/infrastructure/database/entities/post.orm-entity';

export interface IPostRepository {
  createPost(data: Partial<PostOrmEntity>): Promise<PostOrmEntity>;
  findAll(): Promise<PostOrmEntity[]>;
  findById(id: number): Promise<PostOrmEntity | null>;
  updatePost(id: number, data: Partial<PostOrmEntity>): Promise<PostOrmEntity | null>;
  deletePost(id: number): Promise<boolean>;
}
