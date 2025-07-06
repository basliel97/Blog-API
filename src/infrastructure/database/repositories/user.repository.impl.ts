import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const ormEntity = this.userRepository.create({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
    });
    
    const savedEntity = await this.userRepository.save(ormEntity);
    return this.mapToDomain(savedEntity);
  }

  async findById(id: number): Promise<User | null> {
    const ormEntity = await this.userRepository.findOne({ where: { id } });
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.userRepository.findOne({ where: { email } });
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const ormEntity = await this.userRepository.findOne({ where: { username } });
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const ormEntities = await this.userRepository.find();
    return ormEntities.map(entity => this.mapToDomain(entity));
  }

  async update(user: User): Promise<User> {
    const existingEntity = await this.userRepository.findOne({ where: { id: user.id } });
    
    if (!existingEntity) {
      throw new Error(`User with ID ${user.id} not found`);
    }

    Object.assign(existingEntity, {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    const savedEntity = await this.userRepository.save(existingEntity);
    return this.mapToDomain(savedEntity);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private mapToDomain(ormEntity: UserOrmEntity): User {
    return new User(
      ormEntity.id,
      ormEntity.username,
      ormEntity.email,
      ormEntity.password,
      ormEntity.role,
      ormEntity.createdAt,
    );
  }
}
