import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { SliderItem } from '../slider-items/entities/slider-item.entity';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private sliderRepository: Repository<Slider>,
    @InjectRepository(SliderItem)
    private sliderItemRepository: Repository<SliderItem>,
  ) {}
  async create(createSliderDto: CreateSliderDto) {
    console.log('createSliderDto', createSliderDto);
    try {
      const createSlider = await this.sliderRepository.save(createSliderDto);
      console.log('createSlider', createSlider);
      if (createSlider) {
        return {
          message: 'The slider has been successfully created.',
          response: createSlider,
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
      const findAllSliders = await this.sliderRepository.find();
      console.log('findAllSliders', findAllSliders);
      if (findAllSliders) {
        return {
          message: 'You have successfully returned all of the sliders.',
          response: findAllSliders,
          status: 200,
        };
      } else {
        return {
          message: 'Something went wrong',
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
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  async remove(id: number) {
    try {
      const deleteSlider = await this.sliderRepository.delete({ id: id });
      if (deleteSlider) {
        const deleteSliderItems = await this.sliderItemRepository.delete({
          sliderId: id,
        });
        if (deleteSliderItems) {
          return {
            message: 'You successfully deleted slider and slider items.',
            response: deleteSlider,
            status: 200,
          };
        }
      } else {
        return {
          message: 'Something went wrong',
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
