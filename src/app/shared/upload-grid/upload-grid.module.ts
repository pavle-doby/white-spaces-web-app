import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGridComponent } from './upload-grid.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadModule } from '../upload/upload.module';

@NgModule({
  declarations: [UploadGridComponent],
  imports: [CommonModule, FlexLayoutModule, UploadModule],
  exports: [UploadGridComponent],
})
export class UploadGridModule {}
