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
  setSpacePhotosURLsCheckout,
  setAddOnIsSelectedCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
  addSpacePhotoURLCheckout,
  clearSpacePhotosURLsCheckout,
  setAddOnListCheckout,
  appendQuestionsCheckout,
  setQuestionStepperCheckout,
  setQuestionsCheckout,
  setAllPackagesCheckout,
  setShoppingCartCheckout,
} from '../actions/checkout.action';
import {
  TabbarButton,
  getTabbarContnet,
} from 'src/app/shared/tabbar/tabbar.content';

import * as _ from 'lodash';
import { QuestionStepper } from 'src/app/checkout-page/questionnaire/question-stepper/question-stepper.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import {
  CheckoutProgress,
  ProgressState,
  Step,
} from 'src/models/CheckoutProgress.model';

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
  //TODO: Change on proper actions
  progressState: new CheckoutProgress({
    floorPlan: new Step({
      name: 'floorPlan',
      isRequired: true,
      state: LocalStorageService.Instance.FloorPlan
        ? ProgressState.DONE
        : ProgressState.TODO,
    }),
    spacePhotos: new Step({
      name: 'spacePhotos',
      isRequired: true,
      state: LocalStorageService.Instance.SpacePhotosUrls?.length
        ? ProgressState.DONE
        : ProgressState.TODO,
    }),
    addOns: new Step({
      name: 'addOns',
      isRequired: false,
      state: LocalStorageService.Instance?.AddOnList?.find(
        (addon) => addon.isSelected
      )
        ? ProgressState.DONE
        : ProgressState.TODO,
    }),
    questions: new Step({
      name: 'questions',
      isRequired: true,
      state: ProgressState.TODO,
      total: LocalStorageService.Instance.Questions?.length,
      finshed: LocalStorageService.Instance.Questions?.filter((q) => q.isAnswerd)
        .length,
    }),
  }),
};

const reducer = createReducer(
  initState,
  on(setShoppingCartCheckout, (state, { shoppingCart }) => {
    LocalStorageService.Instance.ShoppingCart = shoppingCart;
    return { ...state, shoppingCart: shoppingCart };
  }),
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
    };
  }),
  on(setSpacePhotosURLsCheckout, (state, { filesURLs }) => {
    LocalStorageService.Instance.SpacePhotosUrls = filesURLs;
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
    };
  }),
  on(addSpacePhotoURLCheckout, (state, { fileURL }) => {
    const newUrls = [...state.spacePhotosURLs, fileURL];
    LocalStorageService.Instance.SpacePhotosUrls = newUrls;
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
    };
  }),
  on(clearSpacePhotosURLsCheckout, (state) => {
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
    };
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
      progressState: {
        ...state.progressState,
        addOns: {
          ...state.progressState.addOns,
          state: LocalStorageService.Instance.AddOnList.find(
            (addOn) => addOn.isSelected
          )
            ? ProgressState.DONE
            : ProgressState.TODO,
        },
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
  on(updateQuestionCheckout, (state, { question }) => {
    const newQuestions = state.questions.map((q) => {
      return q.id === question.id ? { ...question } : { ...q };
    });

    LocalStorageService.Instance.Questions = newQuestions;

    let finished = state.progressState.questions.finshed;
    finished += question.isAnswerd ? 1 : -1;
    let total = state.progressState.questions.total;

    return {
      ...state,
      questions: newQuestions,
      progressState: {
        ...state.progressState,
        questions: {
          ...state.progressState.questions,
          finshed: finished,
          state: finished === total ? ProgressState.DONE : ProgressState.TODO,
        },
      },
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

export default function (state: CheckoutState = initState, action: Action) {
  return reducer(state, action);
}
