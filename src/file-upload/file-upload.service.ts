import { Injectable } from '@nestjs/common';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import * as fs from 'fs';
import { readdir } from 'fs/promises';

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

  storeSliderImage(file) {
    const imageBuffer = file.buffer;
    const directory = './uploads/sliders/';

    fs.writeFile(directory + file.originalname, imageBuffer, (err) => {
      if (err) {
        console.log('Error savin image', err);
      } else {
        console.log('Image saved successfully');
      }
    });

    return 'Image uploaded';
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

  storeGalleryImage(id: number, file) {
    console.log('file', file);
    const directoryPath = `uploads/gallery/${id}/`;
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory created successfully at ${directoryPath}`);
      }
    });
    file.forEach((element) => {
      console.log('Writing file with filename:', element.originalname);
      fs.writeFile(
        directoryPath + element.originalname,
        element.buffer,
        'binary',
        (err) => {
          if (err) {
            console.log('Error saving image:', err);
          } else {
            console.log('Images saved successfully');
          }
        },
      );
    });
  }

  findAll() {
    return `This action returns all fileUpload`;
  }

  async findAllForGallery(id: number) {
    const directory = `uploads/gallery/${id}`;
    try {
      const files = await readdir(directory);
      console.log('files', files);
      const transformFiles = files.map((fileName) => ({
        itemImageName: fileName,
        caption: '',
        galleryId: id,
      }));
      return {
        message: 'Successfully retrieved all images',
        response: transformFiles,
        status: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        status: 401,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} fileUpload`;
  }

  update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  remove(fileName: string) {
    console.log('fileName', fileName);
    try {
    } catch (error) {}
  }

  removeGalleryImage(fileName: string, id: number) {
    console.log('fileName', fileName);
    console.log('id', id);
    try {
      const filePath = `./uploads/gallery/${id}/${fileName}`;
      const deleteImage = fs.unlink(filePath, (err) => {
        if (err) {
          console.log('Error:', err);
        } else {
          console.log('Image deleted successfully.');
        }
      });
    } catch (error) {}
  }

  removeSliderImage(fileName: string) {
    console.log('fileName', fileName);
    try {
      const filePath = `./uploads/sliders/${fileName}`;
      console.log('filepath', filePath);
      const deleteImage = fs.unlink(filePath, (err) => {
        if (err) {
          console.log('Error during removing image');
        } else {
          console.log('Image deleted successfully.');
          return {
            message: 'Image removed successfully.',
          };
        }
      });
    } catch (error) {}
  }
}
