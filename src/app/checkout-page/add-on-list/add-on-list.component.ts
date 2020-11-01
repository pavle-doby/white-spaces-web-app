import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setAddOnIsSelectedCheckout,
  setAddOnListCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
} from 'src/app/store/actions/checkout.action';
import { AddOn } from 'src/models/AddOn';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { convertQuestionsDTOListToQuestionsList } from 'src/app/shared/Utilities';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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

    this.addOnList = LocalStorageService.Instance.AddOnList;
    if (!this.addOnList?.length) {
      this.checkoutService
        .getAllAddOns()
        .toPromise()
        .then((addOnList) => {
          LocalStorageService.Instance.AddOnCategroyId = addOnList?.length
            ? addOnList[0].category_id
            : null;
          this.addOnList = addOnList
            .map((addOnDTO) => {
              const questions = convertQuestionsDTOListToQuestionsList(
                addOnDTO.additional_data.questions,
                addOnDTO
              );
              return new AddOn({
                id: addOnDTO.id,
                name: addOnDTO.name,
                description: addOnDTO.data?.description,
                price: addOnDTO.price,
                isSelected: false,
                questions,
              });
            })
            .sort(this.compareAddOns);

          this.$store.dispatch(
            setAddOnListCheckout({ addOnList: this.addOnList })
          );
        });
    }
  }

  public compareAddOns(a: AddOn, b: AddOn): number {
    return a.name.localeCompare(b.name);
  }

  public onAddRemoveAddOn(addOn: AddOn): void {
    if (addOn.isSelected) {
      const productVM: ProductVM = {
        shopping_cart_id: this.shoppingCart.id,
        product_id: addOn.id,
        quantity: 1,
        additional_data: {},
      };

      this.checkoutService
        .addProduct(productVM)
        .toPromise()
        .then((newShoppingCart) => {
          this.$store.dispatch(
            setShoppingCartCheckout({ shoppingCart: newShoppingCart })
          );
          this.$store.dispatch(
            setAddOnIsSelectedCheckout({
              addOn: addOn,
              isSelected: addOn.isSelected,
            })
          );
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
          const newShoppingCart = ShoppingCart.deleteLineItem(
            this.shoppingCart,
            addOnLineItem.id
          );
          this.$store.dispatch(
            setShoppingCartCheckout({ shoppingCart: newShoppingCart })
          );
          this.$store.dispatch(
            setAddOnIsSelectedCheckout({
              addOn: addOn,
              isSelected: addOn.isSelected,
            })
          );
          alert(message);
        })
        .catch((err) => {
          if (err.status === 200) {
            const newShoppingCart = ShoppingCart.deleteLineItem(
              this.shoppingCart,
              addOnLineItem.id
            );
            this.$store.dispatch(
              setShoppingCartCheckout({ shoppingCart: newShoppingCart })
            );
            this.$store.dispatch(
              setAddOnIsSelectedCheckout({
                addOn: addOn,
                isSelected: addOn.isSelected,
              })
            );
            return;
          }
          console.error(err);
          alert(err.message);
        });
    }
  }
}
