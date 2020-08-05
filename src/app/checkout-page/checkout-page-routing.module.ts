import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPageComponent } from './checkout-page.component';
import { FloorPalnUploadComponent } from './floor-paln-upload/floor-paln-upload.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SpacePhotosComponent } from './space-photos/space-photos.component';
import { ReviewAndPayComponent } from './review-and-pay/review-and-pay.component';
import { AddOnListComponent } from './add-on-list/add-on-list.component';

export const CHECKOUT_ROUTER_OUTLET = 'checkoutSteps';

export enum CheckoutPaths {
  FLOOR_PLAN = 'floor-plan',
  SPACE_PHOTOS = 'space-photos',
  ADD_ON_LIST = 'add-on-list',
  QUESTIONNARIE = 'questionnarie',
  REVIEW_AND_PAY = 'review-and-pay',
}

//Changing order of this Map will change order of tabbar display
export const CHECKOUT_PATHS_TO_LABEL_MAP = {
  'floor-plan': 'Floor plan //',
  'space-photos': 'Space Photos //',
  'add-on-list': 'Add ons //',
  questionnarie: 'Questionnarie //',
  'review-and-pay': 'Review & Pay',
};

const routes: Routes = [
  { path: '', component: CheckoutPageComponent },
  {
    path: '',
    component: FloorPalnUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: CheckoutPaths.FLOOR_PLAN,
    component: FloorPalnUploadComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: CheckoutPaths.SPACE_PHOTOS,
    component: SpacePhotosComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: CheckoutPaths.ADD_ON_LIST,
    component: AddOnListComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: CheckoutPaths.QUESTIONNARIE,
    component: QuestionnaireComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
  {
    path: CheckoutPaths.REVIEW_AND_PAY,
    component: ReviewAndPayComponent,
    outlet: CHECKOUT_ROUTER_OUTLET,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
