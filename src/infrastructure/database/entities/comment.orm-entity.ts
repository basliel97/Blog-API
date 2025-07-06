// src/infrastructure/database/entities/comment.orm-entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { PostOrmEntity } from './post.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

@Entity('comments')
export class CommentOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserOrmEntity)
  author: UserOrmEntity;

  @ManyToOne(() => PostOrmEntity, post => post.comments, { onDelete: 'CASCADE' })
  post: PostOrmEntity;

  @CreateDateColumn()
  createdAt: Date;
}
