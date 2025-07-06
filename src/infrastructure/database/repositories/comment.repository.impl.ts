import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentOrmEntity } from '../entities/comment.orm-entity';
import { Repository } from 'typeorm';
import { CommentRepository } from '../../../domain/repositories/comment.repository';
import { Comment, Author } from '../../../domain/entities/comment.entity';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    @InjectRepository(CommentOrmEntity)
    private readonly commentRepository: Repository<CommentOrmEntity>,
  ) {}

  async create(comment: Comment): Promise<Comment> {
    const ormEntity = this.commentRepository.create({
      content: comment.content,
      post: { id: comment.postId },
      author: { id: comment.authorId },
    });
    
    const savedEntity = await this.commentRepository.save(ormEntity);
    return this.mapToDomain(savedEntity);
  }

  async findById(id: number): Promise<Comment | null> {
    const ormEntity = await this.commentRepository.findOne({ 
      where: { id },
      relations: ['author'],
    });
    
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    const ormEntities = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
    
    // Filter out comments with null authors and map to domain
    return ormEntities
      .filter(entity => entity.author !== null)
      .map(entity => this.mapToDomain(entity));
  }

  async findByAuthorId(authorId: number): Promise<Comment[]> {
    const ormEntities = await this.commentRepository.find({
      where: { author: { id: authorId } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    
    // Filter out comments with null authors and map to domain
    return ormEntities
      .filter(entity => entity.author !== null)
      .map(entity => this.mapToDomain(entity));
  }

  async findAll(): Promise<Comment[]> {
    const ormEntities = await this.commentRepository.find({
      relations: ['author', 'post'],
      order: { createdAt: 'DESC' },
    });
    
    return ormEntities.map(entity => this.mapToDomain(entity));
  }

  async update(comment: Comment): Promise<Comment> {
    const existingEntity = await this.commentRepository.findOne({ 
      where: { id: comment.id },
      relations: ['author'],
    });
    
    if (!existingEntity) {
      throw new Error(`Comment with ID ${comment.id} not found`);
    }

    Object.assign(existingEntity, {
      content: comment.content,
    });

    const savedEntity = await this.commentRepository.save(existingEntity);
    return this.mapToDomain(savedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.commentRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private mapToDomain(ormEntity: CommentOrmEntity): Comment {
    const author: Author | undefined = ormEntity.author ? {
      id: ormEntity.author.id,
      username: ormEntity.author.username,
      email: ormEntity.author.email,
    } : undefined;

    return new Comment(
      ormEntity.id,
      ormEntity.content,
      ormEntity.post?.id || 0,
      ormEntity.author?.id || 0,
      ormEntity.createdAt,
      ormEntity.createdAt, // Using createdAt as updatedAt since CommentOrmEntity doesn't have updatedAt
      author,
    );
  }
} 