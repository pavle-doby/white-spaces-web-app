import {
  PackageType,
  PackagesBox,
} from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { AddOn } from 'src/models/AddOn';
import { Question } from 'src/models/Question.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  checkoutSelectPackage,
  setInfoCheckout,
  setFloorPlanCheckout,
  setSpacePhotosCheckout,
  setSpacePhotosURLsCheckout,
  setAddOnIsSelectedCheckout,
  setAnswerCheckout,
  setCurrentIndexCheckout,
  addSpacePhotoURLCheckout,
  clearSpacePhotosURLsCheckout,
  setAddOnListCheckout,
  appendQuestionsCheckout,
  setQuestionStepperCheckout,
  setQuestionsCheckout,
  setAllPackagesCheckout,
} from '../actions/checkout.action';
import {
  TabbarButton,
  getTabbarContnet,
} from 'src/app/shared/tabbar/tabbar.content';

import * as _ from 'lodash';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShopingCart.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';

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
}

const initState: CheckoutState = {
  packageBox: LocalStorageService.Instance.Package,
  allPackageCards: [],
  info: 'Welcome to your renovation project!',
  infoDesc: [''],
  floorPlan: LocalStorageService.Instance.FloorPlan,
  spacePhotos: null,
  spacePhotosURLs: LocalStorageService.Instance.SpacePhotosUrls ?? [],
  addOnList: LocalStorageService.Instance.AddOnList ?? [],
  questions: LocalStorageService.Instance.Questions ?? [],
  tabbarButtons: getTabbarContnet(),
  questionStepper: new QuestionStepper({
    rangeStart: 0,
    rangeEnd: 15,
    numberOfRangeToShow: 16,
    numberOfSteps: LocalStorageService.Instance.Questions?.length ?? 16,
    indexCurrent: 0,
  }),
  shoppingCart: null,
};

const reducer = createReducer(
  initState,
  on(setAllPackagesCheckout, (state, { packages }) => {
    return { ...state, allPackageCards: packages };
  }),
  on(checkoutSelectPackage, (state, { packageBox }) => {
    LocalStorageService.Instance.Package = packageBox;
    return { ...state, packageBox: packageBox };
  }),
  on(setInfoCheckout, (state, { info, description }) => {
    return { ...state, info: info, infoDesc: description };
  }),
  on(setFloorPlanCheckout, (state, { floorPlan }) => {
    LocalStorageService.Instance.FloorPlan = floorPlan;
    return { ...state, floorPlan: floorPlan };
  }),
  on(setSpacePhotosCheckout, (state, { files }) => {
    return { ...state, spacePhotos: files };
  }),
  on(setSpacePhotosURLsCheckout, (state, { filesURLs }) => {
    LocalStorageService.Instance.SpacePhotosUrls = filesURLs;
    return { ...state, spacePhotosURLs: filesURLs };
  }),
  on(addSpacePhotoURLCheckout, (state, { fileURL }) => {
    const newUrls = [...state.spacePhotosURLs, fileURL];
    LocalStorageService.Instance.SpacePhotosUrls = newUrls;
    return { ...state, spacePhotosURLs: newUrls };
  }),
  on(clearSpacePhotosURLsCheckout, (state) => {
    return { ...state, spacePhotosURLs: [] };
  }),
  on(setAddOnIsSelectedCheckout, (state, { addOn, isSelected }) => {
    if (isSelected) {
      LocalStorageService.Instance.appendQuestions(addOn.questions);
    } else {
      LocalStorageService.Instance.Questions = LocalStorageService.Instance.Questions.filter(
        (q) => !addOn.questions.find((addOnQ) => addOnQ.id === q.id)
      );
    }

    LocalStorageService.Instance.chageAddOnState(addOn, isSelected);
    return {
      ...state,
      addOnList: LocalStorageService.Instance.AddOnList,
      questions: LocalStorageService.Instance.Questions,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: LocalStorageService.Instance.Questions?.length,
        indexCurrent: 0,
        rangeStart: 0,
        rangeEnd: 15,
        numberOfRangeToShow: 16,
      },
    };
  }),
  on(setAddOnListCheckout, (state, { addOnList }) => {
    LocalStorageService.Instance.AddOnList = addOnList;
    return { ...state, addOnList: addOnList };
  }),
  on(setQuestionsCheckout, (state, { questions }) => {
    LocalStorageService.Instance.Questions = questions;
    return {
      ...state,
      questions: questions,
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
        indexCurrent: 0,
      },
    };
  }),
  on(appendQuestionsCheckout, (state, { questions }) => {
    LocalStorageService.Instance.appendQuestions(questions);
    return {
      ...state,
      questions: [...state.questions, ...questions],
      questionStepper: {
        ...state.questionStepper,
        numberOfSteps: questions.length,
      },
    };
  }),
  on(setQuestionStepperCheckout, (state, { questionStepper }) => {
    return { ...state, questionStepper: questionStepper };
  }),
  on(setAnswerCheckout, (state, { question }) => {
    const newQuestions = state.questions.map((q) => {
      return q.id === question.id ? { ...question } : { ...q };
    });
    LocalStorageService.Instance.Questions = newQuestions;

    return { ...state, questions: newQuestions };
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

export default function (state: CheckoutState = initState, action: Action) {
  return reducer(state, action);
}
