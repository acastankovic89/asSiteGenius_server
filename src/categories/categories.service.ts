import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    console.log('createCategoryDto', createCategoryDto);
    try {
      const createCategory = await this.categoryRepository.save(
        createCategoryDto,
      );
      console.log('createCategory', createCategory);
      if (createCategory) {
        return {
          message: 'A category has been created.',
          status: 200,
          response: createCategory,
        };
      } else {
        return {
          messsage: 'There seems to be an issue that has occurred.',
          response: createCategory,
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async findAllCategories(): Promise<Category[]> {
    try {
      const fetchAll = await this.categoryRepository.find();
      return fetchAll;
    } catch (error) {
      if (error) {
        return error;
      }
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: id,
        },
      });
      if (category) {
        return {
          message: 'You have successfully retrieved a category.',
          response: category,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 401,
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      var findCategory = await this.categoryRepository.findOne({
        where: {
          id: id,
        },
      });
      if (findCategory) {
        findCategory = updateCategoryDto;
        const updateCategory = await this.categoryRepository.save(findCategory);
        if (updateCategory) {
          return {
            message: 'The category has been updated.',
            response: findCategory,
            status: 200,
          };
        } else {
          return {
            message: 'Something went wrong',
            status: 401,
          };
        }
      } else {
        return {
          message: 'Something went wrong.',
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }

  async removeCategory(id: number) {
    try {
      const deleteCategory = await this.categoryRepository.delete({ id: id });
      if (deleteCategory) {
        return {
          message: 'Category deleted successfully.',
          status: 200,
        };
      }
    } catch (error) {
      if (error) console.log('Error:', error);
    }
  }
}
