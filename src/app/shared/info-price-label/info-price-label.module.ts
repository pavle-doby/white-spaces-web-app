import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPriceLabelComponent } from './info-price-label.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InfoPriceLabelComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [InfoPriceLabelComponent],
})
export class InfoPriceLabelModule {}
