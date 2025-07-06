import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly username?: string,
    public readonly email?: string,
    public readonly role?: string,
  ) {}
} 