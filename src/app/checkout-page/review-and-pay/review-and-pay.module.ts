import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAndPayComponent } from './review-and-pay.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ReviewAndPayComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ReviewAndPayComponent],
})
export class ReviewAndPayModule {}
