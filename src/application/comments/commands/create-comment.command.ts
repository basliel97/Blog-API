import { ICommand } from '@nestjs/cqrs';

export class CreateCommentCommand implements ICommand {
  constructor(
    public readonly content: string,
    public readonly authorId: number,
    public readonly postId: number,
  ) {}
} 