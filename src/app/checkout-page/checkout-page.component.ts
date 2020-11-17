import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';
import { CheckoutService } from '../services/checkout.service.ts.service';
import { setShoppingCartCheckout } from '../store/actions/checkout.action';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { PackagesBox } from '../shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { isHandset } from '../shared/Utilities';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

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
      let shoppingCart = await this.checkoutService
        .getShoppingCart()
        .toPromise();
      const package_ = shoppingCart.line_items
        .map((lineItem) => lineItem.product)
        .find((product) => {
          return (
            product.category_id ===
            LocalStorageService.Instance.PackageCategroyId
          );
        });

      if (!package_) {
        const productVM: ProductVM = {
          shopping_cart_id: shoppingCart.id,
          product_id: this.package.id,
          quantity: 1,
          additional_data: {},
        };

        shoppingCart = await this.checkoutService
          .addProduct(productVM)
          .toPromise();
      }

      this.$store.dispatch(
        setShoppingCartCheckout({ shoppingCart: shoppingCart })
      );
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }

  ngOnDestroy(): void {
    if (this.subCheckoutState) this.subCheckoutState.unsubscribe();
  }
}
