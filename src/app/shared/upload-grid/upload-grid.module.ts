import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGridComponent } from './upload-grid.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UploadGridComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [UploadGridComponent],
})
export class UploadGridModule {}
