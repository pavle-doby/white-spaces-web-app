import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningLabelComponent } from './opening-label.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [OpeningLabelComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [OpeningLabelComponent],
})
export class OpeningLabelModule {}
