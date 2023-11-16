import { Test, TestingModule } from '@nestjs/testing';
import { SliderItemsController } from './slider-items.controller';
import { SliderItemsService } from './slider-items.service';

describe('SliderItemsController', () => {
  let controller: SliderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SliderItemsController],
      providers: [SliderItemsService],
    }).compile();

    controller = module.get<SliderItemsController>(SliderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
