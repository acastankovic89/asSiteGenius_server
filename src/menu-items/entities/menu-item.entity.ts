import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MenuItem {
  filter(arg0: (second: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  targetId: number;

  @Column({ nullable: true })
  rang: number;

  @Column()
  menuId: number;

  @Column()
  type: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  cdate: string;

  @Column({ nullable: true })
  udate: string;

  @Column({ nullable: true })
  updatedBy: string;

  children: MenuItem[];
}
