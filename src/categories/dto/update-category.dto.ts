import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  id: number;
  title: string;
  parentId: number;
  subtitle: string;
  introText: string;
  published: number;
  content: string;
  slug: string;
  introImage: string;
  mainImage: string;
  publishDate: string;
  metaDescription: string;
  children: [];
  article: [];
}
