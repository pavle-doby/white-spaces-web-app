import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacePhotosComponent } from './space-photos.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageManagerModule } from 'src/app/shared/image-manager/image-manager.module';
import { InfoModule } from 'src/app/shared/info/info.module';

@NgModule({
  declarations: [SpacePhotosComponent],
  imports: [CommonModule, FlexLayoutModule, ImageManagerModule, InfoModule],
  exports: [SpacePhotosComponent],
})
export class SpacePhotosModule {}
