import {
  PackageType,
  PackagesBox,
} from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question';
import { Action, createReducer, on } from '@ngrx/store';
import {
  checkoutSelectPackage,
  setInfoCheckout,
  setFloorPlanCheckout,
  setSpacePhotosCheckout,
  setSpacePhotosURLsCheckout,
  setAddOnIsSelectedCheckout,
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
  spacePhotos?: FileList;
  spacePhotosURLs: string[];
  addOnList: AddOn[];
  questions: Question[];
  tabbarButtons: TabbarButton[];
}

const initState: CheckoutState = {
  packageBox: null,
  info: 'Welcome to your renovation project!',
  infoDesc: [''],
  floorPlan: null,
  spacePhotos: null,
  spacePhotosURLs: [],
  addOnList: [
    new AddOn({
      id: 0,
      name: '1 // Lighting plan',
      description: `Includes all necessary drawings for production company
    with all dimensions, space distribution and also separated
    drawings of each element both external and internal.
    No additional engagement required.
    You only need to built it!`,
      price: 179,
    }),
    new AddOn({
      id: 1,
      name: '2 // Closet drawings',
      description: `Includes all necessary drawings for production company
    with all dimensions, space distribution and also separated
    drawings of each element both external and internal.
    No additional engagement required.
    You only need to built it!`,
      price: 269,
    }),
    new AddOn({
      id: 2,
      name: '3 // Kitchen plans',
      description: `Includes all necessary drawings for production company
    with all dimensions, space distribution and also separated
    drawings of each element both external and internal.
    No additional engagement required.
    You only need to built it!`,
      price: 399,
    }),
  ],
  questions: null,
  tabbarButtons: getTabbarContnet(),
};

const reducer = createReducer(
  initState,
  on(checkoutSelectPackage, (state, { packageBox }) => {
    return { ...state, packageBox: packageBox };
  }),
  on(setInfoCheckout, (state, { info, description }) => {
    return { ...state, info: info, infoDesc: description };
  }),
  on(setFloorPlanCheckout, (state, { file }) => {
    return { ...state, floorPlan: file };
  }),
  on(setSpacePhotosCheckout, (state, { files }) => {
    return { ...state, spacePhotos: files };
  }),
  on(setSpacePhotosURLsCheckout, (state, { filesURLs }) => {
    return { ...state, spacePhotosURLs: filesURLs };
  }),
  on(setAddOnIsSelectedCheckout, (state, { addOn, isSelected }) => {
    const addOns = state.addOnList.map((ao) => {
      const isSelec = ao.id === addOn.id ? isSelected : ao.isSelected;
      return {
        ...ao,
        isSelected: isSelec,
      };
    });
    return { ...state, addOnList: addOns };
  })
);

export default function (state: CheckoutState = initState, action: Action) {
  return reducer(state, action);
}
