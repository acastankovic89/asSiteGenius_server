import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('add-category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories(): Promise<any> {
    const categories = await this.categoriesService.findAllCategories();
    console.log('categories', categories);
    const categoryTree = this.buildCategoryTree(categories, null);
    console.log('categoryTree', JSON.stringify(categoryTree, null, 2));
    return categoryTree;
  }

  @Get('getAllCategories')
  getAllCategoriesForTAble() {
    return this.categoriesService.findAllCategories();
  }

  private buildCategoryTree(categories: Category[], parentId: number): any {
    const categoryTree = [];

    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId,
    );

    for (const category of filteredCategories) {
      const children = this.buildCategoryTree(categories, category.id);
      if (children.length > 0) {
        category.children = children;
      }

      categoryTree.push(category);
    }

    return categoryTree;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeCategory(+id);
  }
}
