import { Module } from '@nestjs/common';
import { ArticleEntity } from './article.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository.js';
import { ArticleService } from './article.service.js';
import { ArticleController } from './article.controller.js';
import { UserService } from '../user/user.service.js';
import { UserEntity } from '../user/user.entity.js';
import { UserRepository } from '../user/user.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, UserRepository, UserService],
  exports: [ArticleService],
})
export class ArticleModule {}
