import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouGetComponent } from './you-get.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleModule } from 'src/app/shared/title/title.module';
import { OpeningLabelModule } from 'src/app/shared/opening-label/opening-label.module';

@NgModule({
  declarations: [YouGetComponent],
  imports: [CommonModule, FlexLayoutModule, TitleModule, OpeningLabelModule],
  exports: [YouGetComponent],
})
export class YouGetModule {}
