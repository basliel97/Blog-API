import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, Inject } from '@nestjs/common';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../../domain/repositories/tokens';
import { User } from '../../../../domain/entities/user.entity';

@Injectable()
@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(query: GetAllUsersQuery): Promise<User[]> {
    return this.userRepository.findAll();
  }
} 