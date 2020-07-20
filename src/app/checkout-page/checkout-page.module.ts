import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FloorPalnUploadModule } from './floor-paln-upload/floor-paln-upload.module';
import { SpacePhotosModule } from './space-photos/space-photos.module';
import { AddOnsModule } from './add-ons/add-ons.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ReviewAndPayModule } from './review-and-pay/review-and-pay.module';
import { ThankYouPageModule } from './thank-you-page/thank-you-page.module';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [
    CommonModule,
    CheckoutPageRoutingModule,
    FlexLayoutModule,
    FloorPalnUploadModule,
    SpacePhotosModule,
    AddOnsModule,
    QuestionnaireModule,
    ReviewAndPayModule,
    ThankYouPageModule,
  ],
  exports: [CheckoutPageComponent],
})
export class CheckoutPageModule {}
