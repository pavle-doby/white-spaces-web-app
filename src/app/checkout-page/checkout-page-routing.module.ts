import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPageComponent } from './checkout-page.component';
import { FloorPalnUploadComponent } from './floor-paln-upload/floor-paln-upload.component';
import { SpacePhotosUploadComponent } from './space-photos-upload/space-photos-upload.component';

export const CHECKOUT_ROUTER_OUTLET = 'checkout_ro';

const routes: Routes = [
  { path: '', component: CheckoutPageComponent },
  {
    path: 'floor-pan',
    component: FloorPalnUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: 'space-photos',
    component: SpacePhotosUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
