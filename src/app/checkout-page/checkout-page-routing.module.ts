import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPageComponent } from './checkout-page.component';
import { FloorPalnUploadComponent } from './floor-paln-upload/floor-paln-upload.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SpacePhotosComponent } from './space-photos/space-photos.component';

export const CHECKOUT_ROUTER_OUTLET = 'checkout-ro';

const routes: Routes = [
  { path: '', component: CheckoutPageComponent },
  { path: '', component: FloorPalnUploadComponent, outlet: 'checkoutro' },
  {
    path: 'floor-plan',
    component: FloorPalnUploadComponent,
    outlet: 'checkoutro',
  },
  {
    path: 'questionnarie',
    component: QuestionnaireComponent,
    outlet: 'checkoutro',
  },
  {
    path: 'space-photos',
    component: SpacePhotosComponent,
    outlet: 'checkoutro',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
