import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ArticleRepository } from './article.repository.js';
import { ArticleEntity } from './article.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { UserService } from '../user/user.service.js';
import { buildArticleResponseObject } from './utils/build-article-response-object.js';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<ArticleEntity[]> {
    const foundArticles = await this.articleRepository.find();
    return foundArticles.map((article) => {
      return buildArticleResponseObject(article);
    });
  }

  async deleteAllUserArticles(userId: string): Promise<ArticleEntity[]> {
    const deleteResult = await this.articleRepository.deleteAllUserArticles(
      userId,
    );
    return deleteResult.map((article) => {
      return buildArticleResponseObject(article);
    });
  }

  async getAllUserArticles(userId: string): Promise<ArticleEntity[]> {
    const foundArticles = await this.articleRepository.getAllUserArticles(
      userId,
    );
    return foundArticles.map((article) => {
      return buildArticleResponseObject(article);
    });
  }

  async createWelcomeArticle(user: UserEntity): Promise<ArticleEntity> {
    const newWelcomeArticle = new ArticleEntity();
    newWelcomeArticle.title = 'Welcome to my blog!';
    newWelcomeArticle.body = 'This is your first article!';
    newWelcomeArticle.author = user;
    return await this.articleRepository.save(newWelcomeArticle);
  }

  async createNewArticle(
    userId: string,
    articleTitle: string,
    articleBody: string,
  ): Promise<ArticleEntity> {
    const foundUser = await this.userService.getUserWithArticles(userId);
    const newArticle = new ArticleEntity();
    newArticle.title = articleTitle;
    newArticle.body = articleBody;
    newArticle.author = foundUser;
    const savedArticle = await this.articleRepository.save(newArticle);
    return buildArticleResponseObject(savedArticle);
  }
}
