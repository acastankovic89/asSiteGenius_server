import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  introText: string;

  @Column()
  published: number;

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column()
  introImage: string;

  @Column()
  mainImage: string;

  @Column()
  publishDate: string;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  metaDescription: string;

  @Column({ nullable: true })
  metaTitle: string;

  @ManyToOne(() => Category, (category) => category.article)
  category: Category[];
}
