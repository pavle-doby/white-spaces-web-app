import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  checkoutSelectPackage,
  setInfoCheckout,
  setFloorPlanCheckout,
  setSpacePhotosURLsCheckout,
  setAddOnIsSelectedCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
  addSpacePhotoURLCheckout,
  clearSpacePhotosURLsCheckout,
  setAddOnListCheckout,
  setQuestionStepperCheckout,
  setQuestionsCheckout,
  setAllPackagesCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
  setTabbarStateCheckout,
  setInitStateChekcout,
} from '../actions/checkout.action';
import {
  TabbarButton,
  getTabbarContnet,
} from 'src/app/shared/tabbar/tabbar.content';

import * as _ from 'lodash';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import {
  CheckoutProgress,
  ProgressState,
  Step,
} from 'src/models/CheckoutProgress.model';
import { isHandset } from 'src/app/shared/Utilities';
import { TabbarText } from 'src/models/TabbarText.model';
import { AddOnDTO } from 'src/models/AddOnDTO';

export const QS_RANGE_START = 0;
export const QS_RANGE_END_SHORT = 4;
export const QS_RANGE_END_WIDE = 15;
export const QS_NUM_RANGE_TO_SHOW_SHORT = 5;
export const QS_NUM_RANGE_TO_SHOW_WIDE = 16;
export const QS_INDEX_CURRENT = 0;

export interface CheckoutState {
  packageBox?: PackagesBox; // Jedan paket koji je u side kartici
  allPackageCards: SideCadrPackage[];
  info: string; //
  infoDesc: string[];
  floorPlan?: FloorPlan;
  spacePhotos?: FileList;
  spacePhotosURLs: string[];
  addOnList: AddOn[];
  questions: Question[];
  tabbarButtons: TabbarButton[];
  questionStepper: QuestionStepper;
  shoppingCart: ShoppingCart;
  progressState: CheckoutProgress;
}

const getInitState = (): CheckoutState => {
  let initState: CheckoutState = {
    packageBox: null,
    allPackageCards: [],
    info: 'Welcome to your renovation project!',
    infoDesc: [''],
    floorPlan: null,
    spacePhotos: null,
    spacePhotosURLs: [],
    addOnList: [],
    questions: [],
    tabbarButtons: getTabbarContnet(),
    questionStepper: new QuestionStepper({
      rangeStart: QS_RANGE_START,
      rangeEnd: isHandset() ? QS_RANGE_END_SHORT : QS_RANGE_END_WIDE,
      numberOfRangeToShow: isHandset()
        ? QS_NUM_RANGE_TO_SHOW_SHORT
        : QS_NUM_RANGE_TO_SHOW_WIDE,
      numberOfSteps: isHandset()
        ? QS_NUM_RANGE_TO_SHOW_SHORT
        : QS_NUM_RANGE_TO_SHOW_WIDE,
      indexCurrent: QS_INDEX_CURRENT,
    }),
    shoppingCart: null,
    //TODO: Change on proper actions
    progressState: new CheckoutProgress({
      floorPlan: new Step({
        name: TabbarText.FLOOR_PLAN,
        isRequired: true,
        state: ProgressState.TODO,
      }),
      spacePhotos: new Step({
        name: TabbarText.SPACE_PHOTOS,
        isRequired: true,
        state: ProgressState.TODO,
      }),
      addOns: new Step({
        name: TabbarText.ADD_ONS,
        isRequired: false,
        state: ProgressState.TODO,
      }),
      questions: new Step({
        name: TabbarText.QUESTIONNARIE,
        isRequired: true,
        state: ProgressState.TODO, // will be set properly in constructor
        total: null,
        finshed: null,
      }),
    }),
  };

  const stepList: Step[] = Object.values(initState.progressState);
  const newTabbarState = initState.tabbarButtons.map((btn) => {
    const step = stepList.find((step) => step.name === btn.text);
    return { ...btn, isCompleted: step?.state === ProgressState.DONE };
  });
  initState.tabbarButtons = newTabbarState;
  return initState;
};

const reducer = createReducer(
  getInitState(),
  on(setInitStateChekcout, (state) => {
    return { ...getInitState() };
  }),
  on(setShoppingCartCheckout, (state, { shoppingCart }) => {
    let tabbarButtons = state.tabbarButtons;

    console.log('From BE', { shoppingCart });

    const product = ShoppingCart.getPackageProduct(shoppingCart);
    const lineItem = ShoppingCart.getPackageLineItem(shoppingCart);

    //#region packageBox
    const packageBox = ShoppingCart.convertPackageProductToPackageBox(product);
    //#endregion

    //#region floorPlan
    const url = lineItem.additional_data.floor_plan;
    const name = lineItem.additional_data.floor_plan_name;
    const floorPlan = new FloorPlan({ url, name });

    const isFloorPalnDone = !!url;
    //#endregion floorPlan

    //#region spacePhotosURLs
    const spacePhotosURLs = lineItem.additional_data.images;

    const isSpacePhotosDone = !!spacePhotosURLs?.length;
    //#endregion

    //#region addOnList
    const addOnProdList = ShoppingCart.getAddOnProductList(shoppingCart);
    const selectedAddOns = addOnProdList.map((addOnProd) =>
      AddOn.covertAddOnDTOToAddOn(addOnProd as AddOnDTO, true)
    );
    const addOnList = state.addOnList
      .map((addOn) => ({
        ...addOn,
        isSelected: !!selectedAddOns.find((sAddOn) => sAddOn.id === addOn.id),
      }))
      .sort(AddOn.compare);

    const isOneSelected = !!selectedAddOns.length;
    //#endregion

    //#region questions
    let questions = [];
    let additionalDataQuestions = [];
    shoppingCart.line_items.forEach((li) => {
      additionalDataQuestions = li.additional_data?.questions ?? [];
      questions = [...questions, ...additionalDataQuestions];
    });

    const finished = Question.calculateFinishedQuestions(questions);
    const total = questions.length;
    const isQuestionsDone = total === finished;
    //#endregion

    //#region tabbarButtons
    let tabbarComplitedObj = {};
    tabbarComplitedObj[TabbarText.FLOOR_PLAN] = isFloorPalnDone;
    tabbarComplitedObj[TabbarText.SPACE_PHOTOS] = isSpacePhotosDone;
    tabbarComplitedObj[TabbarText.ADD_ONS] = isOneSelected;
    tabbarComplitedObj[TabbarText.QUESTIONNARIE] = isQuestionsDone;

    tabbarButtons = TabbarButton.updateTbbarBtnComplitedStateWithObject({
      tabbarButtons,
      tabbarComplitedObj,
    });
    //#endregion

    console.log('shoppingCart map to state finished');

    return {
      ...state,
      shoppingCart,
      packageBox,
      floorPlan,
      spacePhotosURLs,
      addOnList,
      questions,
      tabbarButtons,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
      },
      progressState: {
        ...state.progressState,
        floorPlan: {
          ...state.progressState.floorPlan,
          state: isFloorPalnDone ? ProgressState.DONE : ProgressState.TODO,
        },
        spacePhotos: {
          ...state.progressState.spacePhotos,
          state: isSpacePhotosDone ? ProgressState.DONE : ProgressState.TODO,
        },
        questions: {
          ...state.progressState.questions,
          finshed: finished,
          total: total,
          state: isQuestionsDone ? ProgressState.DONE : ProgressState.TODO,
        },
        addOns: {
          ...state.progressState.addOns,
          state: isOneSelected ? ProgressState.DONE : ProgressState.TODO,
        },
      },
    };
  }),
  on(setTabbarStateCheckout, (state, { buttons }) => {
    return { ...state, tabbarButtons: buttons };
  }),
  on(selectTabbarButtonCheckout, (state, { btnText: tabbarBtnText }) => {
    const newTabbarState: TabbarButton[] = state.tabbarButtons.map(
      (btn: TabbarButton) => {
        return btn.text === tabbarBtnText
          ? { ...btn, isSelected: true }
          : { ...btn, isSelected: false };
      }
    );
    return { ...state, tabbarButtons: newTabbarState };
  }),
  on(setAllPackagesCheckout, (state, { packages }) => {
    return { ...state, allPackageCards: packages };
  }),
  on(checkoutSelectPackage, (state, { packageBox }) => {
    return { ...state, packageBox };
  }),
  on(setInfoCheckout, (state, { info, description }) => {
    return { ...state, info: info, infoDesc: description };
  }),
  on(setFloorPlanCheckout, (state, { floorPlan }) => {
    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.FLOOR_PLAN
    );
    return {
      ...state,
      floorPlan: floorPlan,
      progressState: {
        ...state.progressState,
        floorPlan: {
          ...state.progressState.floorPlan,
          state: ProgressState.DONE,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(setSpacePhotosURLsCheckout, (state, { filesURLs }) => {
    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.SPACE_PHOTOS
    );
    return {
      ...state,
      spacePhotosURLs: filesURLs,
      progressState: {
        ...state.progressState,
        spacePhotos: {
          ...state.progressState.spacePhotos,
          state: ProgressState.DONE,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(addSpacePhotoURLCheckout, (state, { fileURL }) => {
    const newUrls = [...state.spacePhotosURLs, fileURL];

    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.SPACE_PHOTOS
    );
    return {
      ...state,
      spacePhotosURLs: newUrls,
      progressState: {
        ...state.progressState,
        spacePhotos: {
          ...state.progressState.spacePhotos,
          state: ProgressState.DONE,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(clearSpacePhotosURLsCheckout, (state) => {
    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.SPACE_PHOTOS,
      false
    );
    return {
      ...state,
      spacePhotosURLs: [],
      progressState: {
        ...state.progressState,
        spacePhotos: {
          ...state.progressState.spacePhotos,
          state: ProgressState.TODO,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(setAddOnIsSelectedCheckout, (state, { addOn, isSelected, isProduct }) => {
    if (isProduct) {
      addOn = state.addOnList.find((ao) => ao.id === addOn.id);
    }
    if (!addOn) {
      console.log('Addon nullish', { addOn });

      return { ...state };
    }
    console.log({ state });

    let questions = state.questions;
    if (isSelected) {
      questions = [...questions, ...addOn.questions];
    } else {
      const isAddOnQuestion = (addOn, question) =>
        addOn.questions.find((addOnQ) => addOnQ.id === question.id);

      questions = questions.filter((q) => !isAddOnQuestion(addOn, q));
    }

    const addOnList = state.addOnList.map((ao) => ({
      ...ao,
      isSelected: ao.id === addOn.id ? isSelected : ao.isSelected,
    }));

    const isOneSelected = isSelected
      ? isSelected
      : !!addOnList.find((ao) => ao.isSelected);

    let tabbarButtons = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.ADD_ONS,
      isOneSelected
    );

    let finished = Question.calculateFinishedQuestions(questions);
    let total = questions.length;
    let isDone = total === finished;

    tabbarButtons = TabbarButton.updateTabbarBtnComplitedState(
      tabbarButtons,
      TabbarText.QUESTIONNARIE,
      isDone
    );

    return {
      ...state,
      addOnList,
      questions,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
        indexCurrent: QS_INDEX_CURRENT,
        rangeStart: QS_RANGE_START,
        rangeEnd: isHandset() ? QS_RANGE_END_SHORT : QS_NUM_RANGE_TO_SHOW_WIDE,
        numberOfRangeToShow: isHandset()
          ? QS_NUM_RANGE_TO_SHOW_SHORT
          : QS_NUM_RANGE_TO_SHOW_WIDE,
      },
      progressState: {
        ...state.progressState,
        addOns: {
          ...state.progressState.addOns,
          state: isOneSelected ? ProgressState.DONE : ProgressState.TODO,
        },
        questions: {
          ...state.progressState.questions,
          total: total,
          finshed: finished,
          state: isDone ? ProgressState.DONE : ProgressState.TODO,
        },
      },
      tabbarButtons,
    };
  }),
  on(setAddOnListCheckout, (state, { addOnList }) => {
    const tabbarButtons = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.ADD_ONS,
      !!addOnList.find((addOn) => addOn.isSelected)
    );
    return { ...state, addOnList, tabbarButtons };
  }),
  on(setQuestionsCheckout, (state, { questions }) => {
    const finished = Question.calculateFinishedQuestions(questions);
    const total = questions.length;
    const isDone = finished === total;
    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.QUESTIONNARIE,
      isDone
    );

    return {
      ...state,
      questions: questions,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
        indexCurrent: QS_INDEX_CURRENT,
      },
      progressState: {
        ...state.progressState,
        questions: {
          ...state.progressState.questions,
          finshed: finished,
          total: total,
          state: isDone ? ProgressState.DONE : ProgressState.TODO,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(setQuestionStepperCheckout, (state, { questionStepper }) => {
    return { ...state, questionStepper: questionStepper };
  }),
  on(updateQuestionCheckout, (state, { question }) => {
    const newQuestions = state.questions.map((q) => {
      return q.id === question.id ? { ...question } : { ...q };
    });

    const finished = Question.calculateFinishedQuestions(newQuestions);
    const total = newQuestions.length;
    const isDone = total === finished;

    const newTabbarState = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.QUESTIONNARIE,
      isDone
    );

    return {
      ...state,
      questions: newQuestions,
      progressState: {
        ...state.progressState,
        questions: {
          ...state.progressState.questions,
          finshed: finished,
          total: total,
          state: isDone ? ProgressState.DONE : ProgressState.TODO,
        },
      },
      tabbarButtons: newTabbarState,
    };
  }),
  on(setCurrentIndexCheckout, (state, { currentIndex }) => {
    let newRangeStart = state.questionStepper.rangeStart;
    let newRangeEnd = state.questionStepper.rangeEnd;
    let range = state.questionStepper.numberOfRangeToShow;

    if (currentIndex > state.questionStepper.rangeEnd) {
      newRangeStart = currentIndex - range + 1;
      newRangeEnd = currentIndex;
    } else if (currentIndex < state.questionStepper.rangeStart) {
      newRangeStart = currentIndex;
      newRangeEnd = currentIndex + range - 1;
    }

    const newStepper: QuestionStepper = {
      ...state.questionStepper,
      indexCurrent: currentIndex,
      rangeStart: newRangeStart,
      rangeEnd: newRangeEnd,
    };

    return { ...state, questionStepper: newStepper };
  })
);

export default function (
  state: CheckoutState = getInitState(),
  action: Action
) {
  return reducer(state, action);
}
