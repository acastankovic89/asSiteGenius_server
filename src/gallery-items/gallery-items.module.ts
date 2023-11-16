import { Module } from '@nestjs/common';
import { GalleryItemsService } from './gallery-items.service';
import { GalleryItemsController } from './gallery-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryItem } from './entities/gallery-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryItem])],
  controllers: [GalleryItemsController],
  providers: [GalleryItemsService],
})
export class GalleryItemsModule {}
