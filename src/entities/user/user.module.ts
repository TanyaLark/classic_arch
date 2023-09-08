import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity.js';
import { UserController } from './user.controller.js';
import { ArticleService } from '../article/article.service.js';
import { ArticleEntity } from '../article/article.entity.js';
import { ArticleRepository } from '../article/article.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, ArticleService, ArticleRepository],
  exports: [UserService],
})
export class UserModule {}
