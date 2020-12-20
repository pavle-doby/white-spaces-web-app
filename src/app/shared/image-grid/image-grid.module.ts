import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGridComponent } from './image-grid.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ImageGridComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ImageGridComponent],
})
export class ImageGridModule {}
