import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDescriptionComponent } from './image-description.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ImageDescriptionComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ImageDescriptionComponent],
})
export class ImageDescriptionModule {}
