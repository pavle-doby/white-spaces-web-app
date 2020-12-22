import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  checkoutSelectPackage,
  setInfoCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
  setAddOnListCheckout,
  setAllPackagesCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
  setInitStateChekcout,
  processDoneCheckout,
  appendImageFloorPalnCheckout,
  appendSpacePhotoImageCheckout,
} from '../actions/checkout.action';
import {
  TabbarButton,
  getTabbarContnet,
} from 'src/app/shared/tabbar/tabbar.content';

import * as _ from 'lodash';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import {
  CheckoutProgress,
  ProgressState,
  Step,
} from 'src/models/CheckoutProgress.model';
import { isArray, isHandset } from 'src/app/shared/Utilities';
import { TabbarText } from 'src/models/TabbarText.model';
import { AddOnDTO } from 'src/models/AddOnDTO';
import { SectionRanges } from 'src/models/SectionRanges.model';
import { Image } from 'src/models/Image.model';

export const QS_RANGE_START = 0;
export const QS_RANGE_END_SHORT = 3;
export const QS_RANGE_END_WIDE = 15;
export const QS_NUM_RANGE_TO_SHOW_SHORT = 4;
export const QS_NUM_RANGE_TO_SHOW_WIDE = 16;
export const QS_INDEX_CURRENT = 0;

export interface CheckoutState {
  packageBox?: PackagesBox; // Jedan paket koji je u side kartici
  allPackageCards: SideCadrPackage[];
  info: string; //
  infoDesc: string[];
  floorPlanImages?: Image[];
  spacePhotoImages: Image[];
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
    floorPlanImages: [],
    spacePhotoImages: [],
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
      currentSection: '',
      dictSectionRanges: {},
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

    const product = ShoppingCart.getPackageProduct(shoppingCart);
    const lineItem = ShoppingCart.getPackageLineItem(shoppingCart);

    //#region packageBox
    const packageBox = ShoppingCart.convertPackageProductToPackageBox(product);
    //#endregion

    //#region floorPlan
    console.log({ shoppingCart });

    const urls = lineItem.additional_data.floor_plan;
    const floorPlanImages =
      urls && Array.isArray(urls)
        ? urls.map((url) => {
            return new Image({ src: url });
          })
        : [];

    const isFloorPalnDone = !!floorPlanImages.length;
    //#endregion floorPlan

    //#region spacePhotosURLs
    const spacePhotoImages = isArray(lineItem.additional_data.images)
      ? lineItem.additional_data.images.map((src) => new Image({ src }))
      : [];

    const isSpacePhotosDone = !!spacePhotoImages.length;
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
    let questions: Question[] = [];
    let additionalDataQuestions = [];

    const packageLineItem = ShoppingCart.getPackageLineItem(shoppingCart);
    additionalDataQuestions = packageLineItem.additional_data?.questions ?? [];
    questions = [...questions, ...additionalDataQuestions];

    const addOnsLineItems = ShoppingCart.getAddOnLineItemList(shoppingCart);
    addOnsLineItems.forEach((li) => {
      additionalDataQuestions = li.additional_data?.questions ?? [];
      questions = [...questions, ...additionalDataQuestions];
    });

    // console.log(questions.map((q, i) => ({ s: q.section, i })));

    let dictSectionRanges = SectionRanges.makeDictSectionRanges(questions);

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

    return {
      ...state,
      shoppingCart,
      packageBox,
      floorPlanImages,
      spacePhotoImages,
      addOnList,
      questions,
      tabbarButtons,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
        dictSectionRanges,
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
  on(selectTabbarButtonCheckout, (state, { btnText: tabbarBtnText }) => {
    const tabbarButtons = state.tabbarButtons.map((btn) => {
      return {
        ...btn,
        isSelected: btn.text === tabbarBtnText,
      };
    });
    return { ...state, tabbarButtons };
  }),
  on(setAllPackagesCheckout, (state, { packages }) => {
    return { ...state, allPackageCards: packages };
  }),
  on(checkoutSelectPackage, (state, { packageBox }) => {
    return { ...state, packageBox };
  }),
  on(setInfoCheckout, (state, { info, description }) => {
    return { ...state, info, infoDesc: description };
  }),
  on(setAddOnListCheckout, (state, { addOnList }) => {
    const tabbarButtons = TabbarButton.updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.ADD_ONS,
      !!addOnList.find((addOn) => addOn.isSelected)
    );
    return { ...state, addOnList, tabbarButtons };
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

    const questions = state.questions;
    const section = questions[currentIndex].section;
    const sectionRanges = state.questionStepper.dictSectionRanges[section];

    if (
      currentIndex === sectionRanges.rangeStart ||
      currentIndex === sectionRanges.rangeEnd
    ) {
      newRangeStart = sectionRanges.rangeStart;
      newRangeEnd = sectionRanges.rangeEnd;
      range = isHandset()
        ? QS_NUM_RANGE_TO_SHOW_SHORT
        : newRangeEnd - newRangeStart;
    }

    const newStepper: QuestionStepper = {
      ...state.questionStepper,
      indexCurrent: currentIndex,
      rangeStart: newRangeStart,
      rangeEnd: newRangeEnd,
      numberOfRangeToShow: range,
      currentSection: section,
    };

    return { ...state, questionStepper: newStepper };
  }),
  on(processDoneCheckout, (state, {}) => {
    return {
      ...state,
      ...getInitState(),
      allPackageCards: [...state.allPackageCards],
    };
  }),
  on(appendImageFloorPalnCheckout, (state, { image }) => {
    return {
      ...state,
      floorPlanImages: [...state.floorPlanImages, image],
    };
  }),
  on(appendSpacePhotoImageCheckout, (state, { image }) => {
    return {
      ...state,
      spacePhotoImages: [...state.spacePhotoImages, image],
    };
  })
);

export default function (
  state: CheckoutState = getInitState(),
  action: Action
) {
  return reducer(state, action);
}
