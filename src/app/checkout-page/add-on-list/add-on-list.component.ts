import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
  setCurrentIndexCheckout,
} from 'src/app/store/actions/checkout.action';
import { AddOn } from 'src/models/AddOn';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { TabbarText } from 'src/models/TabbarText.model';

const INFO = `Feel like you’re not getting enough?
Customize your package easily with extra plans and drawings.`;

const INFO_DESC = `Please note that adding an extra plan will require additional
engagement and time for finishing the project.`;

@Component({
  selector: 'app-add-on-list',
  templateUrl: './add-on-list.component.html',
  styleUrls: ['./add-on-list.component.scss'],
})
export class AddOnListComponent implements OnInit {
  public $checkoutState: Observable<CheckoutState>;
  public addOnList: AddOn[] = [];

  public subChekcoutState: Subscription;
  public shoppingCart: ShoppingCart;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$checkoutState = this.$store.select((state) => state.checkout);
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );
    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.ADD_ONS })
    );
  }

  ngOnInit(): void {
    this.subChekcoutState = this.$checkoutState.subscribe((ckState) => {
      this.shoppingCart = ckState.shoppingCart;
    });
  }

  public onAddRemoveAddOn(addOn: AddOn): void {
    if (addOn.isSelected) {
      const productVM: ProductVM = {
        shopping_cart_id: this.shoppingCart.id,
        product_id: addOn.id,
        quantity: 1,
        additional_data: {
          questions: addOn.questions,
        },
      };

      this.checkoutService
        .addProduct(productVM)
        .toPromise()
        .then((shoppingCart) => {
          this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
          this.$store.dispatch(setCurrentIndexCheckout({ currentIndex: 0 }));
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } else {
      const addOnLineItem = ShoppingCart.getLineItemWithProductId(
        this.shoppingCart,
        addOn.id
      );

      this.checkoutService
        .deleteProduct(addOnLineItem.id)
        .toPromise()
        .then((message) => {
          const shoppingCart = ShoppingCart.deleteLineItem(
            this.shoppingCart,
            addOnLineItem.id
          );
          this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
          this.$store.dispatch(setCurrentIndexCheckout({ currentIndex: 0 }));

          alert(message);
        })
        .catch((err) => {
          if (err.status === 200) {
            const shoppingCart = ShoppingCart.deleteLineItem(
              this.shoppingCart,
              addOnLineItem.id
            );
            this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
            this.$store.dispatch(setCurrentIndexCheckout({ currentIndex: 0 }));

            return;
          }
          console.error(err);
          alert(err.message);
        });
    }
  }
}
