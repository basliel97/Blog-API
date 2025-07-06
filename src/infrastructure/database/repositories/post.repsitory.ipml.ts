import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostOrmEntity } from '../entities/post.orm-entity';
import { Repository, ILike } from 'typeorm';
import { PostRepository } from '../../../domain/repositories/post.repository';
import { Post, Author } from '../../../domain/entities/post.entity';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(PostOrmEntity)
    private readonly postRepository: Repository<PostOrmEntity>,
  ) {}

  async create(post: Post): Promise<Post> {
    const ormEntity = this.postRepository.create({
      id: post.id,
      title: post.title,
      content: post.content,
      author: { id: post.authorId },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
    
    const savedEntity = await this.postRepository.save(ormEntity);
    return this.mapToDomain(savedEntity);
  }

  async findById(id: number): Promise<Post | null> {
    const ormEntity = await this.postRepository.findOne({ 
      where: { id },
      relations: ['author'],
    });
    
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findAll(): Promise<Post[]> {
    const ormEntities = await this.postRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    
    // Filter out posts with null authors and map to domain
    return ormEntities
      .filter(entity => entity.author !== null)
      .map(entity => this.mapToDomain(entity));
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    const ormEntities = await this.postRepository.find({
      where: { author: { id: authorId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    
    // Filter out posts with null authors and map to domain
    return ormEntities
      .filter(entity => entity.author !== null)
      .map(entity => this.mapToDomain(entity));
  }

  async searchByTitleOrContent(searchTerm: string): Promise<Post[]> {
    const ormEntities = await this.postRepository.find({
      where: [
        { title: ILike(`%${searchTerm}%`) },
        { content: ILike(`%${searchTerm}%`) },
      ],
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    
    // Filter out posts with null authors and map to domain
    return ormEntities
      .filter(entity => entity.author !== null)
      .map(entity => this.mapToDomain(entity));
  }

  async update(post: Post): Promise<Post> {
    const existingEntity = await this.postRepository.findOne({ 
      where: { id: post.id },
      relations: ['author'],
    });
    
    if (!existingEntity) {
      throw new Error(`Post with ID ${post.id} not found`);
    }

    Object.assign(existingEntity, {
      title: post.title,
      content: post.content,
      updatedAt: post.updatedAt,
    });

    const savedEntity = await this.postRepository.save(existingEntity);
    return this.mapToDomain(savedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private mapToDomain(ormEntity: PostOrmEntity): Post {
    const author: Author | undefined = ormEntity.author ? {
      id: ormEntity.author.id,
      username: ormEntity.author.username,
      email: ormEntity.author.email,
    } : undefined;

    return new Post(
      ormEntity.id,
      ormEntity.title,
      ormEntity.content,
      ormEntity.author?.id || 0,
      ormEntity.createdAt,
      ormEntity.updatedAt,
      author,
    );
  }
}
