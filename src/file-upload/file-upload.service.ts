import { Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  create(createFileUploadDto: CreateFileUploadDto) {
    return 'This action adds a new fileUpload';
  }

  storeIntroImage(file) {
    console.log('file aaaa', file);
    const imageBuffer = file.buffer;
    const directory = './uploads/thumbs/';

    fs.writeFile(directory + file.originalname, imageBuffer, (err) => {
      if (err) {
        console.log('Error saving image:', err);
      } else {
        console.log('Image saved successfully');
      }
    });

    return 'Image uploaded.';
  }

  storeMainImage(file) {
    console.log('file aaaa', file);
    const imageBuffer = file.buffer;
    const directory = './uploads/';

    fs.writeFile(directory + file.originalname, imageBuffer, (err) => {
      if (err) {
        console.log('Error saving image:', err);
      } else {
        console.log('Image saved successfully');
      }
    });

    return 'Image uploaded.';
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileUpload`;
  }
}
