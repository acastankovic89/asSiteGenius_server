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
    try {
      for (const element of galeryData) {
        const galleryId = parseInt(element.galleryId, 10);
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

  async findAllForSingleGallery(id) {
    console.log('id', id);
    try {
      const fetchAllSliderItems = await this.galleryItemRepository.find({
        where: {
          galleryId: id,
        },
      });
      if (fetchAllSliderItems) {
        return {
          message: 'You successfully retrived gallery items.',
          response: fetchAllSliderItems,
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

  findOne(id: number) {
    return `This action returns a #${id} galleryItem`;
  }

  async update(body) {
    const updatedItems = [];
    for (const element of body) {
      console.log('ele', element);
      const findGalleryItem = await this.galleryItemRepository.findOne({
        where: {
          itemImageName: element.itemImageName,
          galleryId: element.galleryId,
        },
      });
      if (findGalleryItem) {
        findGalleryItem.caption = element.caption;
        const updatedItem = await this.galleryItemRepository.save(
          findGalleryItem,
        );
        updatedItems.push(updatedItem);
      }
    }
    if (updatedItems.length > 0) {
      console.log('update', updatedItems);
      return {
        message: 'The items in the gallery have been successfully updated',
        response: updatedItems,
        status: 200,
      };
    } else {
      return {
        message: 'No items were updated',
        response: null,
        status: 404,
      };
    }
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
