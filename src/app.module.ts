import * as crypto from 'crypto';

if (!(global as any).crypto) {
  (global as any).crypto = crypto;
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';
import { PostOrmEntity } from './infrastructure/database/entities/post.orm-entity';
import { CommentOrmEntity } from './infrastructure/database/entities/comment.orm-entity';

import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { UserModule } from './modules/users/user.module';
import { CommentModule } from './modules/comments/comment.module';
import { HealthController } from './presentation/controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT') || '5432'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DATABASE'),
    entities: [UserOrmEntity, PostOrmEntity, CommentOrmEntity],
    synchronize: true, // Usually false for prod; run migrations instead
    ssl:  {
    rejectUnauthorized: false, // 🛠️ This fixes the "self-signed certificate" error
  },
  }),
}),

    AuthModule,
    PostModule,
    UserModule,
    CommentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
