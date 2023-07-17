import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { MenusModule } from './menus/menus.module';
import { RolesModule } from './roles/roles.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Article } from './articles/entities/article.entity';
import { Category } from './categories/entities/category.entity';
import { Comment } from './comments/entities/comment.entity';
import { Media } from './media/entities/media.entity';
import { Role } from './roles/entities/role.entity';
import { Menu } from './menus/entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'asSiteGenius_db',
      entities: [User, Article, Category, Comment, Media, Role, Menu],
      synchronize: true,
    }),
    ArticlesModule,
    CategoriesModule,
    UsersModule,
    MediaModule,
    MenusModule,
    RolesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
