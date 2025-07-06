import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { UpdateUserCommand } from '../update-user.command';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../../domain/repositories/tokens';
import { User, UserRole } from '../../../../domain/entities/user.entity';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findById(command.id);
    
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${command.id} not found`);
    }

    // Check for conflicts if email or username is being updated
    if (command.email && command.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(command.email);
      if (userWithEmail) {
        throw new ConflictException('User with this email already exists');
      }
    }

    if (command.username && command.username !== existingUser.username) {
      const userWithUsername = await this.userRepository.findByUsername(command.username);
      if (userWithUsername) {
        throw new ConflictException('User with this username already exists');
      }
    }

    const updatedUser = existingUser.update(
      command.username,
      command.email,
      command.role as UserRole,
    );

    return this.userRepository.update(updatedUser);
  }
} 