import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorPalnUploadComponent } from './floor-paln-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadGridModule } from 'src/app/shared/upload-grid/upload-grid.module';
import { UploadModule } from 'src/app/shared/upload/upload.module';

@NgModule({
  declarations: [FloorPalnUploadComponent],
  imports: [CommonModule, FlexLayoutModule, UploadGridModule, UploadModule],
  exports: [FloorPalnUploadComponent],
})
export class FloorPalnUploadModule {}
