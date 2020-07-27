import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorPalnUploadComponent } from './floor-paln-upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FloorPalnUploadComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [FloorPalnUploadComponent],
})
export class FloorPalnUploadModule {}
