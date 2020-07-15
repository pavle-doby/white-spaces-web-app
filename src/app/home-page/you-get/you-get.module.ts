import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouGetComponent } from './you-get.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleModule } from 'src/app/shared/title/title.module';
import { OpeningLabelModule } from 'src/app/shared/opening-label/opening-label.module';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialModules = [MatDialogModule];

@NgModule({
  declarations: [YouGetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TitleModule,
    OpeningLabelModule,
    MaterialModules,
  ],
  exports: [YouGetComponent, MaterialModules],
})
export class YouGetModule {}
