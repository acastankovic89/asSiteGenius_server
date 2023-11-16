import { Injectable } from '@nestjs/common';
import { CreateSliderItemDto } from './dto/create-slider-item.dto';
import { UpdateSliderItemDto } from './dto/update-slider-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SliderItem } from './entities/slider-item.entity';

@Injectable()
export class SliderItemsService {
  constructor(
    @InjectRepository(SliderItem)
    private sliderItemRepository: Repository<SliderItem>,
  ) {}

  async create(createSliderItemDto: CreateSliderItemDto) {
    try {
      const createSliderItem = await this.sliderItemRepository.save(
        createSliderItemDto,
      );
      console.log('createSliderItem', createSliderItem);
      if (createSliderItem) {
        return {
          message: 'Slider Item created successfully.',
          response: createSliderItem,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong!',
          status: 400,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  findAll() {
    return `This action returns all sliderItems`;
  }

  async findAllForCurrentSlider(id) {
    console.log('id', id);
    try {
      const findItems = await this.sliderItemRepository.find({
        where: { sliderId: id },
      });
      if (findItems) {
        return {
          message: 'You successfully returned slider items for slider.',
          response: findItems,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong..',
          status: 401,
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async findOne(id: number) {
    try {
      const findSliderItem = await this.sliderItemRepository.findOne({
        where: { id: id },
      });
      if (findSliderItem) {
        return {
          message: 'You have successfully returned the slider item.',
          response: findSliderItem,
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

  async update(id: number, updateSliderItemDto: UpdateSliderItemDto) {
    try {
      const findSliderItem = await this.sliderItemRepository.findOne({
        where: {
          id: id,
        },
      });
      console.log('findSliderItem', findSliderItem);
      if (findSliderItem) {
        const updateSlider = {
          ...findSliderItem,
          name: updateSliderItemDto.name,
          caption: updateSliderItemDto.caption,
          caption2: updateSliderItemDto.caption2,
          image: updateSliderItemDto.image,
        };
        const result = await this.sliderItemRepository.save(updateSlider);
        if (result) {
          console.log('result', result);
          return {
            message: 'You successfully updated slider item',
            response: updateSlider,
            status: 200,
          };
        } else {
          return {
            message: 'Something went wrong',
            status: 401,
          };
        }
      } else {
        return {
          message: "We couldn't find the slider item.",
        };
      }
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
    }
  }

  async remove(id: number) {
    try {
      const deleteSliderItem = await this.sliderItemRepository.delete({
        id: id,
      });
      if (deleteSliderItem) {
        return {
          message: 'You successfully delete slider item.',
          response: deleteSliderItem,
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
}
