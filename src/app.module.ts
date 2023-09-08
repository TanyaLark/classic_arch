import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { UserModule } from './entities/user/user.module';
import { ArticleModule } from './entities/article/article.module.js';

@Module({
  imports: [DatabaseModule, UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
