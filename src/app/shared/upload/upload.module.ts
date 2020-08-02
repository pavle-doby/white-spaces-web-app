import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [UploadComponent],
})
export class UploadModule {}
