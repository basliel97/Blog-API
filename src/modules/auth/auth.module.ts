import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/entities/user.orm-entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../users/user.module';
import { USER_REPOSITORY } from '../../domain/repositories/tokens';
import { GetUserByIdHandler } from '../../application/users/queries/handlers/get-user-by-id.handler';

@Module({
  imports: [
    UserModule,
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jwt_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GetUserByIdHandler,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
