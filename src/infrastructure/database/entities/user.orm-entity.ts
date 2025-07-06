import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { UserRole } from 'src/domain/entities/user.entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
