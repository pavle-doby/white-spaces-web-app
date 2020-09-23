import { createAction, props } from '@ngrx/store';
import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { TabbarButton } from 'src/app/shared/tabbar/tabbar.content';

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

export const setTabbarStateCheckout = createAction(
  '[CHECKOUT] SET_TABBAR_STATE',
  props<{ buttons: TabbarButton[] }>()
);

export const setFloorPlanCheckout = createAction(
  '[CHECKOUT] SET_FLOOT_PLAN',
  props<{ floorPlan: FloorPlan }>()
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

export const setAddOnListCheckout = createAction(
  '[CHECKOUT] SET_ADD_ON_LIST',
  props<{ addOnList: AddOn[] }>()
);

export const updateQuestionCheckout = createAction(
  '[CHECKOUT] SET_ANSWER',
  props<{ question: Question }>()
);

export const setQuestionsCheckout = createAction(
  '[CHECKOUT] SET_QUESTIONS',
  props<{ questions: Question[] }>()
);

export const setQuestionStepperCheckout = createAction(
  '[CHECKOUT] SET_QUESTION_STEPPER',
  props<{ questionStepper: QuestionStepper }>()
);

export const setCurrentIndexCheckout = createAction(
  '[CHECKOUT] SET_CURRENT_INDEX',
  props<{ currentIndex: number }>()
);

export const setAllPackagesCheckout = createAction(
  '[CHECKOUT] SET_ALL_PACKAGES',
  props<{ packages: SideCadrPackage[] }>()
);

export const clearAllPackagesCheckout = createAction(
  '[CHECKOUT] CLEAR_ALL_PACKAGES',
  props()
);

export const setShoppingCartCheckout = createAction(
  '[CHECKOUT] SET_SHOPPING_CART',
  props<{ shoppingCart: ShoppingCart }>()
);
