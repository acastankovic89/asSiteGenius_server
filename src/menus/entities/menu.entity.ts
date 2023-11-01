import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  languageId: number;

  @Column()
  name: string;
}
