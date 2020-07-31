import {
  PackageType,
  PackagesBox,
} from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question';
import { Action, createReducer, on } from '@ngrx/store';
import {
  checkoutSelectPackage,
  checkoutSetInfo,
} from '../actions/checkout.action';
import {
  TabbarButton,
  getTabbarContnet,
} from 'src/app/shared/tabbar/tabbar.content';

export interface CheckoutState {
  packageBox?: PackagesBox; // Jedan paket koji je u side kartici
  info: string; //
  infoDesc: string[];
  floorPlan?: File;
  spacePhotos?: File[];
  addOns: AddOn[];
  questions: Question[];
  tabbarButtons: TabbarButton[];
}

const initState: CheckoutState = {
  packageBox: null,
  info: 'Welcome to your renovation project!',
  infoDesc: [''],
  floorPlan: null,
  spacePhotos: null,
  addOns: null,
  questions: null,
  tabbarButtons: getTabbarContnet(),
};

const reducer = createReducer(
  initState,
  on(checkoutSelectPackage, (state, { packageBox }) => {
    return { ...state, packageBox: packageBox };
  }),
  on(checkoutSetInfo, (state, { info, description }) => {
    return { ...state, info: info, infoDesc: description };
  })
);

export default function (state: CheckoutState = initState, action: Action) {
  return reducer(state, action);
}
