import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('introImage')
  @UseInterceptors(FileInterceptor('introImage'))
  introImage(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return this.fileUploadService.storeIntroImage(file);
  }

  @Post('sliderImage')
  @UseInterceptors(FileInterceptor('sliderImage'))
  sliderImage(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return this.fileUploadService.storeSliderImage(file);
  }

  @Post('mainImage')
  @UseInterceptors(FileInterceptor('mainImage'))
  mainImage(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return this.fileUploadService.storeMainImage(file);
  }

  @Post('gallery/:id')
  @UseInterceptors(FilesInterceptor('galleryImageUpload'))
  galleryImage(
    @Param('id') id: number,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    return this.fileUploadService.storeGalleryImage(id, file);
  }

  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get('gallery/:id')
  findAllForGallery(@Param('id') id: number) {
    return this.fileUploadService.findAllForGallery(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadService.update(+id, updateFileUploadDto);
  }

  @Delete(':name')
  remove(@Param('name') fileName: string) {
    return this.fileUploadService.remove(fileName);
  }

  @Delete('gallery/:id/:name')
  removeGalleryImage(@Param('name') fileName: string, @Param('id') id: number) {
    return this.fileUploadService.removeGalleryImage(fileName, id);
  }

  @Delete('slider-image/:name')
  removeSliderImage(@Param('name') fileName: string) {
    return this.fileUploadService.removeSliderImage(fileName);
  }
}
