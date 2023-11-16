import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GalleryItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  itemImageName: string;

  @Column()
  caption: string;

  @Column()
  galleryId: number;
}
