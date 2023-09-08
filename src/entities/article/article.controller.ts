import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service.js';
import { ArticleEntity } from './article.entity.js';

@Injectable()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/all/')
  async getAll(): Promise<ArticleEntity[]> {
    return this.articleService.getAll();
  }

  @Delete('/:userId')
  async deleteAllUserArticles(
    @Param('userId') userId: string,
  ): Promise<ArticleEntity[]> {
    return await this.articleService.deleteAllUserArticles(userId);
  }

  @Get('/user/:userId')
  async getOneUserArticle(
    @Param('userId') userId: string,
  ): Promise<ArticleEntity[]> {
    return this.articleService.getAllUserArticles(userId);
  }

  @Post('/create/:userId')
  async createNewArticle(
    @Body('title') articleTitle: string,
    @Body('body') articleBody: string,
    @Param('userId') userId: string,
  ): Promise<ArticleEntity> {
    return this.articleService.createNewArticle(
      userId,
      articleTitle,
      articleBody,
    );
  }
}
