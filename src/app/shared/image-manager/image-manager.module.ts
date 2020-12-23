import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageManagerComponent } from './image-manager.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageGridModule } from '../image-grid/image-grid.module';
import { UploadModule } from '../upload/upload.module';

@NgModule({
  declarations: [ImageManagerComponent],
  imports: [CommonModule, FlexLayoutModule, ImageGridModule, UploadModule],
  exports: [ImageManagerComponent],
})
export class ImageManagerModule {}
