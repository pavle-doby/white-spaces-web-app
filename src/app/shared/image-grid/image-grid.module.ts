import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGridComponent } from './image-grid.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCardModule } from '../image-card/image-card.module';

@NgModule({
  declarations: [ImageGridComponent],
  imports: [CommonModule, FlexLayoutModule, ImageCardModule],
  exports: [ImageGridComponent],
})
export class ImageGridModule {}
