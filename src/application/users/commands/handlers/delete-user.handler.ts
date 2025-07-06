import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DeleteUserCommand } from '../delete-user.command';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../../domain/repositories/tokens';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const existingUser = await this.userRepository.findById(command.id);
    
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${command.id} not found`);
    }

    const deleted = await this.userRepository.delete(command.id);
    if (!deleted) {
      throw new Error('Failed to delete user');
    }
  }
} 