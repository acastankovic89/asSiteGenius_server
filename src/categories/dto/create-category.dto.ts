export class CreateCategoryDto {
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
}
