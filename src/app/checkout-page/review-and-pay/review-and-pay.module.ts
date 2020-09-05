import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAndPayComponent } from './review-and-pay.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfoPriceLabelModule } from '../../shared/info-price-label/info-price-label.module';

@NgModule({
  declarations: [ReviewAndPayComponent],
  imports: [CommonModule, FlexLayoutModule, InfoPriceLabelModule],
  exports: [ReviewAndPayComponent],
})
export class ReviewAndPayModule {}
