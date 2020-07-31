import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorPalnUploadComponent } from './floor-paln-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadGridModule } from 'src/app/shared/upload-grid/upload-grid.module';

@NgModule({
  declarations: [FloorPalnUploadComponent],
  imports: [CommonModule, FlexLayoutModule, UploadGridModule],
  exports: [FloorPalnUploadComponent],
})
export class FloorPalnUploadModule {}
