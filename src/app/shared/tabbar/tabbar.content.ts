import {
  CheckoutPaths,
  CHECKOUT_PATHS_TO_LABEL_MAP,
} from 'src/app/checkout-page/checkout-page-routing.module';

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
