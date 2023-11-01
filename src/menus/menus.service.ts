import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { MenuItem } from '../menu-items/entities/menu-item.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    console.log('createMenuDto', createMenuDto);
    try {
      const addMenu = await this.menusRepository.save(createMenuDto);
      console.log('addMenu', addMenu);
      if (addMenu) {
        return {
          message: 'Menu is created.',
          response: addMenu,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 401,
        };
      }
    } catch (error) {
      if (error) return error;
    }
  }

  async findAll() {
    try {
      const findAllMenus = await this.menusRepository.find();
      if (findAllMenus) {
        return {
          message: 'You have successfully retrieved all of the menus.',
          response: findAllMenus,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        return error;
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  async remove(id: number) {
    try {
      const deleteMenu = await this.menusRepository.delete({ id: id });
      const deleteMenuItems = await this.menuItemRepository.delete({
        menuId: id,
      });
      return {
        message: 'You successfully deleted the menu.',
        status: 200,
      };
    } catch (error) {
      if (error) return error;
    }
  }
}
