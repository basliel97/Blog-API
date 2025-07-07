import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';
import { PostOrmEntity } from './infrastructure/database/entities/post.orm-entity';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comments/comment.module';
import { CommentOrmEntity } from './infrastructure/database/entities/comment.orm-entity';
import { HealthController } from './presentation/controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE === 'postgres' ? 'postgres' : 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'blog_api',
      entities: [UserOrmEntity, PostOrmEntity, CommentOrmEntity],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.DB_TYPE === 'postgres' ? { rejectUnauthorized: false } : false,
      extra: process.env.DB_TYPE === 'postgres' ? {
        ssl: {
          rejectUnauthorized: false,
        },
        max: 1,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      } : {},
      logging: process.env.NODE_ENV === 'development',
      cache: false,
    }),
    AuthModule,
    PostModule,
    UserModule, 
    CommentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
