import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacePhotosComponent } from './space-photos.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadGridModule } from 'src/app/shared/upload-grid/upload-grid.module';

@NgModule({
  declarations: [SpacePhotosComponent],
  imports: [CommonModule, FlexLayoutModule, UploadGridModule],
  exports: [SpacePhotosComponent],
})
export class SpacePhotosModule {}
