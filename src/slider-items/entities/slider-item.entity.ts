import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SliderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  caption2: string;

  @Column()
  sliderId: number;

  @Column()
  image: string;
}
