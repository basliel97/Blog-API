import { IQuery } from '@nestjs/cqrs';

export class GetCommentsByPostQuery implements IQuery {
  constructor(public readonly postId: number) {}
} 