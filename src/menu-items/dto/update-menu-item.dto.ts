import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  menuId: number;
  targetId: number;
  type: number;
  url: string;
  parentId: number;
}
