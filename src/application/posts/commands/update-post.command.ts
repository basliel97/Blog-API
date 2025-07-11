import { ICommand } from '@nestjs/cqrs';

export class UpdatePostCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly authorId: number,
    public readonly title?: string,
    public readonly content?: string,
  ) {}
} 