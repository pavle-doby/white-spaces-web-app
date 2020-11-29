import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from '../store/reducers/checkout.reducer';
import { CheckoutService } from '../services/checkout.service.ts.service';
import {
  setAddOnListCheckout,
  setCurrentIndexCheckout,
  setShoppingCartCheckout,
} from '../store/actions/checkout.action';
import { LocalStorageService } from '../services/local-storage.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { PackagesBox } from '../shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { isHandset } from '../shared/Utilities';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { AddOn } from 'src/models/AddOn';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from '../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CONFIRMATION_DIALOG_WIDTH } from '../app.config';
import HttpStatusCode from 'src/models/HttpStatusCode';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  public $checkoutState: Observable<CheckoutState>;
  public subCheckoutState: Subscription;

  public subDialog: Subscription;

  public package: PackagesBox;
  public isHandset: boolean = isHandset();

  constructor(
    private readonly router: Router,
    private readonly $store: Store<AppState>,
    private readonly window: Window,
    private readonly checkoutService: CheckoutService,
    private readonly dialog: MatDialog
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
      } else if (package_.id !== this.package.id) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: CONFIRMATION_DIALOG_WIDTH,
          disableClose: false,
          data: new ConfirmationDialogData({
            titleLabel: 'Do you want to change package?',
            message:
              'If you change package, some of your progress will be lost.',
          }),
        });

        this.subDialog = dialogRef.afterClosed().subscribe(async (yes) => {
          if (!yes) {
            return;
          }

          const packageLineItem = ShoppingCart.getPackageLineItem(shoppingCart);
          this.checkoutService
            .deleteProduct(packageLineItem.id)
            .toPromise()
            .then(async (message) => {
              shoppingCart = ShoppingCart.deleteLineItem(
                shoppingCart,
                packageLineItem.id
              );
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

              const currentIndex = 0;
              this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
              this.$store.dispatch(setCurrentIndexCheckout({ currentIndex }));

              alert(message);
            })
            .catch(async (err) => {
              if (err.status === HttpStatusCode.OK) {
                shoppingCart = ShoppingCart.deleteLineItem(
                  shoppingCart,
                  packageLineItem.id
                );
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

                const currentIndex = 0;
                this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
                this.$store.dispatch(setCurrentIndexCheckout({ currentIndex }));

                return;
              }

              console.error(err);
              alert(err.message);
            });
        });
      }

      this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  ngOnDestroy(): void {
    if (this.subCheckoutState) this.subCheckoutState.unsubscribe();
  }
}
