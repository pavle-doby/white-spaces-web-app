import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';
import { CheckoutService } from '../services/checkout.service.ts.service';
import {
  setAddOnListCheckout,
  setShoppingCartCheckout,
} from '../store/actions/checkout.action';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { PackagesBox } from '../shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { isHandset } from '../shared/Utilities';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { AddOn } from 'src/models/AddOn';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  public $checkoutState: Observable<CheckoutState>;
  public subCheckoutState: Subscription;

  public package: PackagesBox;
  public isHandset: boolean = isHandset();

  constructor(
    private readonly router: Router,
    private readonly $store: Store<AppState>,
    private readonly window: Window,
    private readonly checkoutService: CheckoutService
  ) {
    this.$checkoutState = this.$store.select((state) => state.checkout);
    this.window.document.body.style.width = `100vw`;
  }

  async ngOnInit(): Promise<void> {
    if (this.isHandset) {
      this.router.navigateByUrl(`/${MainRouterPaths.CHECKOUT_MESSAGE}`);
    }

    this.subCheckoutState = this.$checkoutState.subscribe((ckState) => {
      this.package = ckState.packageBox;
    });

    try {
      let addOnDTOList = await this.checkoutService.getAllAddOns().toPromise();
      const addOnList = addOnDTOList
        .map((addOnDTO) => AddOn.covertAddOnDTOToAddOn(addOnDTO))
        .sort(AddOn.compare);

      this.$store.dispatch(setAddOnListCheckout({ addOnList }));

      LocalStorageService.Instance.AddOnCategroyId = addOnDTOList?.length
        ? addOnDTOList[0].category_id
        : null;

      let shoppingCart = await this.checkoutService
        .getShoppingCart()
        .toPromise();

      const package_ = ShoppingCart.getPackageProduct(shoppingCart);

      if (!package_) {
        const productVM: ProductVM = {
          shopping_cart_id: shoppingCart.id,
          product_id: this.package.id,
          quantity: 1,
          additional_data: {
            questions: this.package.questions,
          },
        };

        shoppingCart = await this.checkoutService
          .addProduct(productVM)
          .toPromise();
      }

      this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }

  ngOnDestroy(): void {
    if (this.subCheckoutState) this.subCheckoutState.unsubscribe();
  }
}
