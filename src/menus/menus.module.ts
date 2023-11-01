import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([MenuItem]),
  ],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
