import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { CommentOrmEntity } from './comment.orm-entity';

@Entity('posts')
export class PostOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserOrmEntity;

  @OneToMany(() => CommentOrmEntity, (comment) => comment.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: CommentOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
