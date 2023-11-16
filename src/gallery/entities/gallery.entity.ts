import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}
