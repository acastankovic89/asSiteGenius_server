import { Injectable } from '@nestjs/common';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryItem } from './entities/gallery-item.entity';

@Injectable()
export class GalleryItemsService {
  constructor(
    @InjectRepository(GalleryItem)
    private galleryItemRepository: Repository<GalleryItem>,
  ) {}

  async create(galeryData) {
    console.log('galeryData', galeryData);
    try {
      for (const element of galeryData) {
        console.log('element', element);
        const galleryId = parseInt(element.galleryId, 10);
        console.log(typeof element.galleryId, galleryId);
        const findGalleryItem = await this.galleryItemRepository.findOne({
          where: {
            itemImageName: element.itemImageName,
            galleryId: element.galleryId,
          },
        });
        if (findGalleryItem) {
          findGalleryItem.itemImageName = element.itemImageName;
          findGalleryItem.caption = element.caption;
          const update = await this.galleryItemRepository.save(findGalleryItem);
        } else {
          const parsedGalleryId = parseInt(element.galleryId, 10);
          console.log('Parsed Gallery ID:', parsedGalleryId);

          const create = await this.galleryItemRepository.save({
            ...element,
            galleryId: parsedGalleryId,
          });
          console.log('create', create);
        }
      }
      await this.galleryItemRepository.query('COMMIT');
      return {
        message: 'Gallery is successfully created/updated.',
        status: 200,
        respone: 'success',
      };
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  findAll() {
    return `This action returns all galleryItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galleryItem`;
  }

  update(id: number, updateGalleryItemDto: UpdateGalleryItemDto) {
    return `This action updates a #${id} galleryItem`;
  }

  async remove(id: number, name: string) {
    try {
      const deleteGalleryItem = await this.galleryItemRepository.delete({
        itemImageName: name,
        galleryId: id,
      });
      console.log(deleteGalleryItem);
      if (deleteGalleryItem) {
        return {
          message: ' The gallery item has been deleted successfully.',
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 401,
        };
      }
    } catch (error) {}
    return `This action removes a #${id} galleryItem`;
  }
}
