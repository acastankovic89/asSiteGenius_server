import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
