import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutPageRoutingModule } from './checkout-page-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CommonModule, CheckoutPageRoutingModule],
  exports: [CheckoutPageComponent],
})
export class CheckoutPageModule {}
