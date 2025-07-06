import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
}
