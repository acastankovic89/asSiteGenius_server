import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async createArticle(createArticleDto: CreateArticleDto) {
    console.log('createArticleDto', createArticleDto);
    try {
      const createArticle = await this.articleRepository.save(createArticleDto);
      console.log('createArticle', createArticle);
      if (createArticle) {
        if (createArticle.categoryId) {
          const findCategory = await this.categoryRepository.findOne({
            where: { id: createArticle.categoryId },
            relations: ['article'],
          });

          const findAllArticle = await this.articleRepository.find({
            where: {
              categoryId: createArticle.categoryId,
            },
          });
          console.log('findAllArticle', findAllArticle);

          findCategory.article = findAllArticle;

          const updateCategory = await this.categoryRepository.save(
            findCategory,
          );

          console.log('findCategory', updateCategory);

          return {
            message: 'Article is created and category is updatated',
            response: updateCategory,
            status: 200,
          };
        }
        return {
          message: 'Article is created',
          response: createArticle,
          status: 200,
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async findAllArticles() {
    try {
      const findArticles = await this.articleRepository.find({
        relations: ['category'],
      });
      if (findArticles) {
        return {
          message: 'You have successfully retrieved all the articles.',
          response: findArticles,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          response: findArticles,
          status: 401,
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async findOne(id: number) {
    try {
      const article = await this.articleRepository.findOne({
        where: {
          id: id,
        },
        relations: ['category'],
      });
      if (article) {
        return {
          message: 'Success! The article has been located.',
          response: article,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    console.log('updateArticleDto', updateArticleDto);
    try {
      var findArticle = await this.articleRepository.findOne({
        where: {
          id: updateArticleDto.id,
        },
      });
      findArticle = updateArticleDto;
      const updateArticle = await this.articleRepository.save(findArticle);
      console.log('updateArticle', updateArticle);
      if (updateArticle) {
        return {
          message: 'The article has been updated.',
          response: updateArticle,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          response: updateArticle,
          status: 401,
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async removeArticle(id: number) {
    try {
      const deleteArticle = await this.articleRepository.delete({ id: id });
      console.log('deleteArticle', deleteArticle);
      if (deleteArticle) {
        return {
          message: 'Article is deleted!',
          response: deleteArticle,
        };
      }
    } catch (error) {
      if (error) console.log('Error', error);
    }
  }
}
