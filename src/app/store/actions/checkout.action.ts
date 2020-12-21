import { createAction, props } from '@ngrx/store';
import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { Image } from 'src/models/Image.model';

export const setInitStateChekcout = createAction(
  '[CHECKOUT] SET_INIT_STATE',
  props()
);

export const checkoutSelectPackage = createAction(
  '[CHECKOUT] SELECT_PACKAGE',
  props<{ packageBox: PackagesBox }>()
);

export const setInfoCheckout = createAction(
  '[CHECKOUT] SET_INFO',
  props<{ info: string; description: string[] }>()
);

export const selectTabbarButtonCheckout = createAction(
  '[CHECKOUT] SELECT_TABBAR_BUTTON',
  props<{ btnText: string }>()
);

export const clearSpacePhotosURLsCheckout = createAction(
  '[CHECKOUT] CLEAR_SPACE_PHOTOS_URLS',
  props()
);

export const setAddOnListCheckout = createAction(
  '[CHECKOUT] SET_ADD_ON_LIST',
  props<{ addOnList: AddOn[] }>()
);

export const updateQuestionCheckout = createAction(
  '[CHECKOUT] SET_ANSWER',
  props<{ question: Question }>()
);

export const setCurrentIndexCheckout = createAction(
  '[CHECKOUT] SET_CURRENT_INDEX',
  props<{ currentIndex: number }>()
);

export const setAllPackagesCheckout = createAction(
  '[CHECKOUT] SET_ALL_PACKAGES',
  props<{ packages: SideCadrPackage[] }>()
);

export const setShoppingCartCheckout = createAction(
  '[CHECKOUT] SET_SHOPPING_CART',
  props<{ shoppingCart: ShoppingCart }>()
);

export const processDoneCheckout = createAction(
  '[CHECKOUT] PROCESS_DONE_FINIS'
);

export const appendImageFloorPalnCheckout = createAction(
  '[CHECKOUT] APPEND_IMAGE_FLOOR_PLAN',
  props<{ image: Image }>()
);

export const deleteImageFloorPalnCheckout = createAction(
  '[CHECKOUT] DELETE_IMAGE_FLOOR_PLAN',
  props<{ image: Image; i: number }>()
);
