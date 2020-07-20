import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPageComponent } from './checkout-page.component';
import { FloorPalnUploadComponent } from './floor-paln-upload/floor-paln-upload.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SpacePhotosComponent } from './space-photos/space-photos.component';

export const CHECKOUT_ROUTER_OUTLET = 'checkoutSteps';

const routes: Routes = [
  { path: '', component: CheckoutPageComponent },
  {
    path: '',
    component: FloorPalnUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: 'floor-plan',
    component: FloorPalnUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: 'questionnarie',
    component: QuestionnaireComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: 'space-photos',
    component: SpacePhotosComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
