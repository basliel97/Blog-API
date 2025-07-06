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

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog_api',
      entities: [UserOrmEntity, PostOrmEntity,CommentOrmEntity],
      synchronize: true,
    }),
    AuthModule,
    PostModule,
    UserModule, 
    CommentModule,
  ],
})
export class AppModule {}
