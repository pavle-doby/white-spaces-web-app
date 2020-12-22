import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageManagerDialogComponent } from './image-manager-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageManagerModule } from '../image-manager/image-manager.module';

const MaterialModules = [MatDialogModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [ImageManagerDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModules,
    ImageManagerModule,
  ],
  exports: [ImageManagerDialogComponent],
})
export class ImageManagerDialogModule {}
