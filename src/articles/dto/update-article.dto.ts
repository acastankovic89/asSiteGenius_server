import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  id: number;
  title: string;
  subtitle: string;
  introText: string;
  published: number;
  content: string;
  slug: string;
  introImage: string;
  mainImage: string;
  publishDate: string;
  categoryId: number;
  metaDescription: string;
  category: [];
}
