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

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
