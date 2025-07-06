import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/entities/user.orm-entity';
import { UsersController } from './users.controller';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';
import { USER_REPOSITORY } from '../../domain/repositories/tokens';

// Command Handlers
import { CreateUserHandler } from '../../application/users/commands/handlers/create-user.handler';
import { UpdateUserHandler } from '../../application/users/commands/handlers/update-user.handler';
import { DeleteUserHandler } from '../../application/users/commands/handlers/delete-user.handler';

// Query Handlers
import { GetAllUsersHandler } from '../../application/users/queries/handlers/get-all-users.handler';
import { GetUserByIdHandler } from '../../application/users/queries/handlers/get-user-by-id.handler';

const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

const QueryHandlers = [
  GetAllUsersHandler,
  GetUserByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
