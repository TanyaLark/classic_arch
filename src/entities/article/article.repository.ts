import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity.js';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(dataSource: DataSource) {
    super(ArticleEntity, dataSource.createEntityManager());
  }

  async findByTitle(title: string): Promise<ArticleEntity> {
    return await this.findOne({ where: { title } });
  }

  async getAllUserArticles(userId: string): Promise<ArticleEntity[]> {
    const qb = this.createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where('author.id = :userId', { userId });
    return await qb.getMany();
  }

  async deleteAllUserArticles(userId: string): Promise<ArticleEntity[]> {
    const articlesToDelete = await this.getAllUserArticles(userId);
    return await this.remove(articlesToDelete);
  }
}
