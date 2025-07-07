import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/users/commands/create-user.command';
import { UpdateUserCommand } from '../../application/users/commands/update-user.command';
import { DeleteUserCommand } from '../../application/users/commands/delete-user.command';
import { GetAllUsersQuery } from '../../application/users/queries/get-all-users.query';
import { GetUserByIdQuery } from '../../application/users/queries/get-user-by-id.query';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
        undefined, // role is optional and defaults to USER
      ),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = +id;
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.queryBus.execute(new GetUserByIdQuery(userId));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    const userId = +id;
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.commandBus.execute(
      new UpdateUserCommand(
        userId,
        updateUserDto.username,
        updateUserDto.email,
        updateUserDto.role,
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = +id;
    if (isNaN(userId) || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
