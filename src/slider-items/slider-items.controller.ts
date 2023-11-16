import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SliderItemsService } from './slider-items.service';
import { CreateSliderItemDto } from './dto/create-slider-item.dto';
import { UpdateSliderItemDto } from './dto/update-slider-item.dto';

@Controller('slider-items')
export class SliderItemsController {
  constructor(private readonly sliderItemsService: SliderItemsService) {}

  @Post()
  create(@Body() createSliderItemDto: CreateSliderItemDto) {
    return this.sliderItemsService.create(createSliderItemDto);
  }

  @Get()
  findAll() {
    return this.sliderItemsService.findAll();
  }

  @Get('current-slider/:id')
  findAllForCurrentSlider(@Param('id') id: number) {
    return this.sliderItemsService.findAllForCurrentSlider(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSliderItemDto: UpdateSliderItemDto,
  ) {
    return this.sliderItemsService.update(+id, updateSliderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderItemsService.remove(+id);
  }
}
