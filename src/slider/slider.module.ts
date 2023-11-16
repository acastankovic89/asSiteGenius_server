import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { SliderItem } from '../slider-items/entities/slider-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slider, SliderItem])],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
