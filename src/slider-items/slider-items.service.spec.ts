import { Test, TestingModule } from '@nestjs/testing';
import { SliderItemsService } from './slider-items.service';

describe('SliderItemsService', () => {
  let service: SliderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SliderItemsService],
    }).compile();

    service = module.get<SliderItemsService>(SliderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
