import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutMessagePageComponent } from './checkout-message-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocialIconsModule } from '../social-icons/social-icons.module';
import { LogoModule } from '../logo/logo.module';
import { GradientDirectiveModule } from '../directives/gradient.directive.module';

@NgModule({
  declarations: [CheckoutMessagePageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SocialIconsModule,
    LogoModule,
    GradientDirectiveModule,
  ],
  exports: [CheckoutMessagePageComponent],
})
export class CheckoutMessagePageModule {}
