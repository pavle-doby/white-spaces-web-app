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
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FloorPlan } from 'src/models/FloorPlan.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { SideCadrPackage } from 'src/app/shared/side-card-packages/SideCardPackage';
import {
  CheckoutProgress,
  ProgressState,
  Step,
} from 'src/models/CheckoutProgress.model';
import { updateTabbarBtnComplitedState } from 'src/app/shared/Utilities';
import { TabbarText } from 'src/models/TabbarText.model';

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
        name: TabbarText.FLOOR_PLAN,
        isRequired: true,
        state: LocalStorageService.Instance.FloorPlan
          ? ProgressState.DONE
          : ProgressState.TODO,
      }),
      spacePhotos: new Step({
        name: TabbarText.SPACE_PHOTOS,
        isRequired: true,
        state: LocalStorageService.Instance.SpacePhotosUrls?.length
          ? ProgressState.DONE
          : ProgressState.TODO,
      }),
      addOns: new Step({
        name: TabbarText.ADD_ONS,
        isRequired: false,
        state: LocalStorageService.Instance?.AddOnList?.find(
          (addon) => addon.isSelected
        )
          ? ProgressState.DONE
          : ProgressState.TODO,
      }),
      questions: new Step({
        name: TabbarText.QUESTIONNARIE,
        isRequired: true,
        state: ProgressState.TODO,
        total: LocalStorageService.Instance.Questions?.length,
        finshed: LocalStorageService.Instance.Questions?.filter(
          (q) => q.isAnswerd
        ).length,
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
    LocalStorageService.Instance.ShoppingCart = shoppingCart;
    return { ...state, shoppingCart: shoppingCart };
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
    LocalStorageService.Instance.Package = packageBox;
    return { ...state, packageBox: packageBox };
  }),
  on(setInfoCheckout, (state, { info, description }) => {
    return { ...state, info: info, infoDesc: description };
  }),
  on(setFloorPlanCheckout, (state, { floorPlan }) => {
    LocalStorageService.Instance.FloorPlan = floorPlan;
    const newTabbarState = updateTabbarBtnComplitedState(
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
    LocalStorageService.Instance.SpacePhotosUrls = filesURLs;
    const newTabbarState = updateTabbarBtnComplitedState(
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
    LocalStorageService.Instance.SpacePhotosUrls = newUrls;
    const newTabbarState = updateTabbarBtnComplitedState(
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
    LocalStorageService.Instance.SpacePhotosUrls = [];
    const newTabbarState = updateTabbarBtnComplitedState(
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
  on(setAddOnIsSelectedCheckout, (state, { addOn, isSelected }) => {
    if (isSelected) {
      LocalStorageService.Instance.appendQuestions(addOn.questions);
    } else {
      LocalStorageService.Instance.Questions = LocalStorageService.Instance.Questions.filter(
        (q) => !addOn.questions.find((addOnQ) => addOnQ.id === q.id)
      );
    }
    let newTabbarState = updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.ADD_ONS,
      isSelected
    );
    LocalStorageService.Instance.chageAddOnState(addOn, isSelected);

    const newQuestions = LocalStorageService.Instance.Questions;

    let finished = newQuestions
      .map((q): number => (q.isAnswerd ? 1 : 0))
      .reduce((prev, curr) => {
        return prev + curr;
      });

    let total = newQuestions.length;

    newTabbarState = updateTabbarBtnComplitedState(
      newTabbarState,
      TabbarText.QUESTIONNARIE,
      total === finished
    );

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
        questions: {
          ...state.progressState.questions,
          total: total,
          finshed: finished,
        },
      },
      tabbarButtons: newTabbarState,
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
  on(setQuestionStepperCheckout, (state, { questionStepper }) => {
    return { ...state, questionStepper: questionStepper };
  }),
  on(updateQuestionCheckout, (state, { question }) => {
    const newQuestions = state.questions.map((q) => {
      return q.id === question.id ? { ...question } : { ...q };
    });

    LocalStorageService.Instance.Questions = newQuestions;

    let finished = newQuestions
      .map((q): number => (q.isAnswerd ? 1 : 0))
      .reduce((prev, curr) => {
        return prev + curr;
      });
    let total = newQuestions.length;

    const newTabbarState = updateTabbarBtnComplitedState(
      state.tabbarButtons,
      TabbarText.QUESTIONNARIE,
      total === finished
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
          state: finished === total ? ProgressState.DONE : ProgressState.TODO,
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
