import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GalleryItemsService } from './gallery-items.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';

@Controller('gallery-items')
export class GalleryItemsController {
  constructor(private readonly galleryItemsService: GalleryItemsService) {}

  @Post()
  create(@Body() galeryData) {
    return this.galleryItemsService.create(galeryData);
  }

  @Get()
  findAll() {
    return this.galleryItemsService.findAll();
  }

  @Get(':galleryId')
  findAllForSingleGallery(@Param('galleryId') id: number) {
    return this.galleryItemsService.findAllForSingleGallery(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.galleryItemsService.findOne(+id);
  // }

  @Patch()
  update(@Body() body) {
    return this.galleryItemsService.update(body);
  }

  @Delete('/:id/:imageName')
  remove(@Param('id') id: number, @Param('imageName') name: string) {
    console.log('idsadds', id);
    console.log('nameasdsadsad', name);
    return this.galleryItemsService.remove(id, name);
  }
}
