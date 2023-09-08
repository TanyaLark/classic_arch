import { ArticleEntity } from '../article.entity.js';

export const buildArticleResponseObject = (
  article: ArticleEntity,
): ArticleEntity => {
  delete article.author?.password;
  return article;
};
