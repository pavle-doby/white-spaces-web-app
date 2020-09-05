import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAndPayComponent } from './review-and-pay.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfoPriceLabelModule } from '../../shared/info-price-label/info-price-label.module';
import { FormsModule } from '@angular/forms';
import { GradientDirectiveModule } from 'src/app/shared/directives/gradient.directive.module';

@NgModule({
  declarations: [ReviewAndPayComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    InfoPriceLabelModule,
    FormsModule,
    GradientDirectiveModule,
  ],
  exports: [ReviewAndPayComponent],
})
export class ReviewAndPayModule {}
