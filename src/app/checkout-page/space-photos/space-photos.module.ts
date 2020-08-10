import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacePhotosComponent } from './space-photos.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SpacePhotosComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [SpacePhotosComponent],
})
export class SpacePhotosModule {}
