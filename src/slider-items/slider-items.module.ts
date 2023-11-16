import { Module } from '@nestjs/common';
import { SliderItemsService } from './slider-items.service';
import { SliderItemsController } from './slider-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SliderItem } from './entities/slider-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SliderItem])],
  controllers: [SliderItemsController],
  providers: [SliderItemsService],
})
export class SliderItemsModule {}
