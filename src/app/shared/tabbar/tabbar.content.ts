import { CHECKOUT_PATHS_TO_LABEL_MAP } from 'src/app/checkout-page/checkout-page-routing.module';
import { CheckoutPaths } from 'src/app/checkout-page/checkout-paths';
import { TabbarText } from 'src/models/TabbarText.model';

export class CheckoutStepsRouterLink {
  public static produce(
    path: CheckoutPaths
  ): { outlets: { checkoutSteps: CheckoutPaths[] } }[] {
    return [{ outlets: { checkoutSteps: [path] } }];
  }
}

export class TabbarButton {
  public text: string;
  public isSelected?: boolean = false;
  public isCompleted?: boolean = false;
  public routerLinkArray: { outlets: { checkoutSteps: CheckoutPaths[] } }[];

  constructor(obj: TabbarButton) {
    this.text = obj.text;
    this.isSelected = !!obj.isSelected;
    this.isCompleted = !!obj.isCompleted;
    this.routerLinkArray = obj.routerLinkArray;
  }

  public static updateTabbarBtnComplitedState = (
    tabbarBtnList: TabbarButton[],
    btnText: TabbarText,
    isComplited: boolean = true
  ): TabbarButton[] => {
    return tabbarBtnList.map((btn: TabbarButton) => {
      return btn.text === btnText
        ? { ...btn, isCompleted: isComplited }
        : { ...btn };
    });
  };

  public static updateTbbarBtnComplitedStateWithObject({
    tabbarButtons,
    tabbarComplitedObj,
  }: {
    tabbarButtons: TabbarButton[];
    tabbarComplitedObj: Record<string, boolean>;
  }): TabbarButton[] {
    return tabbarButtons.map((btn) => ({
      ...btn,
      isCompleted: tabbarComplitedObj[btn.text] ?? btn.isCompleted,
    }));
  }
}

export const getTabbarContnet = () => {
  return Object.keys(CHECKOUT_PATHS_TO_LABEL_MAP).map(
    (key: CheckoutPaths) =>
      new TabbarButton({
        text: CHECKOUT_PATHS_TO_LABEL_MAP[key],
        routerLinkArray: CheckoutStepsRouterLink.produce(key),
      })
  );
};

export const TABBAR_CONTENT = getTabbarContnet();
