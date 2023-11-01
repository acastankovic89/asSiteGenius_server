import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto) {
    try {
      const createMenuItem = await this.menuItemRepository.save(
        createMenuItemDto,
      );
      if (createMenuItem) {
        return {
          message: 'Menu item created.',
          response: createMenuItem,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong.',
          status: 401,
        };
      }
    } catch (error) {
      console.log(error);
      if (error) return error;
    }
  }

  async findAll() {
    try {
      const getAllMenuItems = await this.menuItemRepository.find();
      if (getAllMenuItems) {
        return {
          message: 'All menu items are retrieved successfully.',
          response: getAllMenuItems,
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
        console.log('Error:', error);
        return error;
      }
    }
  }

  async findAllMenuItemsTree(id) {
    console.log('id', id);
    try {
      const fetchAll = await this.menuItemRepository.find({
        where: {
          menuId: id,
        },
      });
      console.log('fetchAll');
      const firstLevel = fetchAll.filter((items) => items.parentId === null);
      const tree = this.buildMenuTree(firstLevel, fetchAll);
      return tree;
    } catch (error) {
      if (error) {
        return error;
      }
    }
  }

  buildMenuTree(items, allItems) {
    const tree = [];
    for (const item of items) {
      const children = allItems.filter(
        (childItem) => childItem.parentId === item.id,
      );
      if (children.length > 0) {
        item.children = this.buildMenuTree(children, allItems);
      }
      tree.push(item);
    }
    return tree;
  }

  async findAllForCurrentMenu(id: number) {
    console.log('id', id);
    try {
      const findCurrentMenuItem = await this.menuItemRepository.find({
        where: {
          menuId: id,
        },
      });
      console.log('findAllForCurrentMenu', findCurrentMenuItem);

      if (findCurrentMenuItem) {
        return {
          message: 'All menu items are retrieved successfully.',
          response: findCurrentMenuItem,
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
        console.log('Error:', error);
        return error;
      }
    }
  }

  async findOne(id: number) {
    try {
      const item = await this.menuItemRepository.find({ where: { id: id } });
      if (item) {
        return {
          message:
            'The menu item you requested has been successfully returned.',
          response: item,
        };
      } else {
        return {
          message: 'Something went wrong!',
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error', error);
      }
    }
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    console.log('body', updateMenuItemDto);
    try {
      const findMenuItem = await this.menuItemRepository.find({
        where: {
          id: id,
        },
      });
      if (findMenuItem) {
        const updateMenuItem = {
          ...findMenuItem[0],
          menuId: updateMenuItemDto.menuId,
          targetId: updateMenuItemDto.targetId,
          type: updateMenuItemDto.type,
          url: updateMenuItemDto.url,
          parentId: updateMenuItemDto.parentId,
          name: updateMenuItemDto.name,
        };
        const result = await this.menuItemRepository.save(updateMenuItem);
        if (result) {
          return {
            message: 'The menu item has been updated successfully.',
            response: result,
            status: 200,
          };
        } else {
          return {
            message: 'Something went wrong!',
            status: 401,
          };
        }
      }

      console.log('findMenuItem', findMenuItem[0]);
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async remove(id: number) {
    try {
      const deleteMenuItem = await this.menuItemRepository.delete({ id: id });
      if (deleteMenuItem) {
        return {
          message: 'The menu item has been successfully deleted.',
          response: deleteMenuItem,
        };
      } else {
        return {
          message: 'Something went wrong!',
          response: deleteMenuItem,
        };
      }
    } catch (error) {
      if (error) {
        console.log(`Error: ${error}`);
      }
    }
  }
}
