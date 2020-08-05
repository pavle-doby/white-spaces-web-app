import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FloorPalnUploadModule } from './floor-paln-upload/floor-paln-upload.module';
import { SpacePhotosModule } from './space-photos/space-photos.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ReviewAndPayModule } from './review-and-pay/review-and-pay.module';
import { ThankYouPageModule } from './thank-you-page/thank-you-page.module';
import { LogoModule } from '../shared/logo/logo.module';
import { TabbarModule } from '../shared/tabbar/tabbar.module';
import { InfoModule } from '../shared/info/info.module';
import { AddOnListModule } from './add-on-list/add-on-list.module';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [
    CommonModule,
    CheckoutPageRoutingModule,
    FlexLayoutModule,
    FloorPalnUploadModule,
    SpacePhotosModule,
    AddOnListModule,
    QuestionnaireModule,
    ReviewAndPayModule,
    ThankYouPageModule,
    LogoModule,
    TabbarModule,
    InfoModule,
  ],
  exports: [CheckoutPageComponent],
})
export class CheckoutPageModule {}
