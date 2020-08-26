import { createAction, props } from '@ngrx/store';
import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { FloorPlan } from 'src/models/FloorPlan.model';

export const checkoutSelectPackage = createAction(
  '[CHECKOUT] SELECT_PACKAGE',
  props<{ packageBox: PackagesBox }>()
);

export const setInfoCheckout = createAction(
  '[CHECKOUT] SET_INFO',
  props<{ info: string; description: string[] }>()
);

export const setFloorPlanCheckout = createAction(
  '[CHECKOUT] SET_FLOOT_PLAN',
  props<{ floorPlan: FloorPlan }>()
);

export const setSpacePhotosCheckout = createAction(
  '[CHECKOUT] SET_SPACE_PHOTOS',
  props<{ files: FileList }>()
);

export const setSpacePhotosURLsCheckout = createAction(
  '[CHECKOUT] SET_SPACE_PHOTOS_URLS',
  props<{ filesURLs: string[] }>()
);

export const addSpacePhotoURLCheckout = createAction(
  '[CHECKOUT] ADD_SPACE_PHOTO_URL',
  props<{ fileURL: string }>()
);

export const clearSpacePhotosURLsCheckout = createAction(
  '[CHECKOUT] CLEAR_SPACE_PHOTOS_URLS',
  props()
);

export const setAddOnIsSelectedCheckout = createAction(
  '[CHECKOUT] SELECT_ADD_ON',
  props<{ addOn: AddOn; isSelected: boolean }>()
);

export const setAnswerCheckout = createAction(
  '[CHECKOUT] SET_ANSWER',
  props<{ question: Question }>()
);

export const setCurrentIndexCheckout = createAction(
  '[CHECKOUT] SET_CURRENT_INDEX',
  props<{ currentIndex: number }>()
);
