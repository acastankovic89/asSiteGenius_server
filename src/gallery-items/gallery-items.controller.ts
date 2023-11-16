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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGalleryItemDto: UpdateGalleryItemDto,
  ) {
    return this.galleryItemsService.update(+id, updateGalleryItemDto);
  }

  @Delete('/:id/:imageName')
  remove(@Param('id') id: number, @Param('imageName') name: string) {
    console.log('idsadds', id);
    console.log('nameasdsadsad', name);
    return this.galleryItemsService.remove(id, name);
  }
}
