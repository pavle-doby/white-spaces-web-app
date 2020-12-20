import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from './image-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ImageCardComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatButtonModule],
  exports: [ImageCardComponent],
})
export class ImageCardModule {}
