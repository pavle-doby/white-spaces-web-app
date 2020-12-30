import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorPalnUploadComponent } from './floor-paln-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageManagerModule } from 'src/app/shared/image-manager/image-manager.module';

@NgModule({
  declarations: [FloorPalnUploadComponent],
  imports: [CommonModule, FlexLayoutModule, ImageManagerModule],
  exports: [FloorPalnUploadComponent],
})
export class FloorPalnUploadModule {}
