import { IQuery } from '@nestjs/cqrs';

export class GetAllPostsQuery implements IQuery {
  constructor(public readonly searchTerm?: string) {}
} 