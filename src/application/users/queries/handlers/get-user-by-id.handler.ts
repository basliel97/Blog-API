import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { GetUserByIdQuery } from '../get-user-by-id.query';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../../domain/repositories/tokens';
import { User } from '../../../../domain/entities/user.entity';

@Injectable()
@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    return user;
  }
} 