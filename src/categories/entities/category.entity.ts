import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Article } from '../../articles/entities/article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  parentId: number;

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

  children: Category[];

  @Column({ nullable: true })
  metaDescription: string;

  @OneToMany(() => Article, (article) => article.category)
  article: Article[];
}
