import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}
  async create(createGalleryDto: CreateGalleryDto) {
    try {
      const createGallery = await this.galleryRepository.save(createGalleryDto);
      if (createGallery) {
        return {
          message: 'Gallery has been created successfully.',
          response: createGallery,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async findAll() {
    try {
      const findAllGaleries = await this.galleryRepository.find();
      if (findAllGaleries) {
        return {
          message: 'You succesfully retrived galeries',
          response: findAllGaleries,
          status: 200,
        };
      } else {
        return { message: 'Something went wrong!', status: 401 };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async findOne(id: number) {
    try {
      const gallery = await this.galleryRepository.findOne({
        where: {
          id: id,
        },
      });
      if (gallery) {
        return {
          message: 'Gallery succesfully retrived.',
          response: gallery,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    console.log('updateGalleryDto', updateGalleryDto);
    console.log('id', id);
    try {
      const findGallery = await this.galleryRepository.findOne({
        where: {
          id: id,
        },
      });
      console.log('findOne result:', findGallery);
      if (findGallery) {
        console.log('Original gallery object:', findGallery);

        // Log individual date string values
        console.log('Received createdAt:', updateGalleryDto.createdAt);
        console.log('Received updatedAt:', updateGalleryDto.updatedAt);
        findGallery.name = updateGalleryDto.name;
        findGallery.language = updateGalleryDto.language;
        findGallery.createdAt = updateGalleryDto.createdAt;
        findGallery.updatedAt = updateGalleryDto.updatedAt;

        console.log('Updated gallery object:', findGallery);
        const updateGallery = await this.galleryRepository.save(findGallery);
        if (updateGallery) {
          return {
            message: 'You successfully updated gallery',
            response: updateGallery,
            status: 200,
          };
        } else {
          return {
            message: 'Something went wrong!',
            status: 401,
          };
        }
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
