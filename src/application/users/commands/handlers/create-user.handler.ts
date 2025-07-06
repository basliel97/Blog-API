import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../../domain/repositories/tokens';
import { User, UserRole } from '../../../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    // Check if user already exists
    const existingUserByEmail = await this.userRepository.findByEmail(command.email);
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const existingUserByUsername = await this.userRepository.findByUsername(command.username);
    if (existingUserByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(command.password, 10);

    // Create user
    const user = User.create(
      command.username,
      command.email,
      hashedPassword,
      command.role as UserRole || UserRole.USER,
    );

    return this.userRepository.create(user);
  }
} 