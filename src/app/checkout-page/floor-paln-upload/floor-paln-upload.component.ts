import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store';
import {
  setInfoCheckout,
  setFloorPlanCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
} from 'src/app/store/actions/checkout.action';
import {UploadData} from 'src/app/shared/upload/upload.model';
import {Observable, Subscription} from 'rxjs';
import {CheckoutState} from 'src/app/store/reducers/checkout.reducer';
import {CheckoutService} from 'src/app/services/checkout.service.ts.service';
import {FloorPlan} from 'src/models/FloorPlan.model';
import {ProductVM} from 'src/models/ProductVM.model';
import {ShoppingCart} from 'src/models/ShoppingCart.model';
import {TabbarText} from 'src/models/TabbarText.model';
import {Question} from 'src/models/Question.model';
import {QuestionDTO} from 'src/models/QuestionDTO.model';
import {firstToUpperCase} from 'src/app/shared/Utilities';

const INFO = 'welcome to your renovation project!';

@Component({
  selector: 'app-floor-paln-upload',
  templateUrl: './floor-paln-upload.component.html',
  styleUrls: ['./floor-paln-upload.component.scss'],
})
export class FloorPalnUploadComponent implements OnInit {
  public uploadData: UploadData;
  public successMsg: string;
  public fileName: string;

  public $chekcoutState: Observable<CheckoutState>;
  public subChekcoutState: Subscription;

  public $userName: Observable<string>;
  public subUserName: Subscription;

  public shoppingCart: ShoppingCart;
  public questions: Question[];

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$store.dispatch(setInfoCheckout({info: INFO, description: []}));
    this.$store.dispatch(
      selectTabbarButtonCheckout({btnText: TabbarText.FLOOR_PLAN})
    );

    this.$chekcoutState = this.$store.select((state) => state.checkout);
    this.$userName = this.$store.select(
      (state) => state.user?.user?.first_name
    );

    this.uploadData = new UploadData({
      limit: 1,
      message: 'Please upload your existing floor plan.',
      bottomInfo: ''
    });
    this.successMsg = 'You successfully uploaded your file!';
  }

  ngOnInit(): void {
    this.subChekcoutState = this.$chekcoutState.subscribe((ckState) => {
      this.shoppingCart = ckState.shoppingCart;
      this.questions = ckState.questions;
    });
    this.subUserName = this.$userName.subscribe((name) => {
      const _name = firstToUpperCase(name);
      this.$store.dispatch(
        setInfoCheckout({info: `${_name}, ${INFO}`, description: []})
      );
    });
  }

  public onUploadEvent(files: FileList): void {
    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);

    if (!lineItem.product) {
      alert('Select package');
      return;
    }

    this.checkoutService
      .uploadFile(files[0])
      .toPromise()
      .then((linkObj) => {
        const productVM: ProductVM = {
          shopping_cart_id: this.shoppingCart.id,
          line_item_id: lineItem.id,
          quantity: 1,
          additional_data: {
            ...lineItem.additional_data,
            floor_plan: linkObj.link,
            questions: this.questions
              .filter((q) => q.product_id === lineItem.product.id)
              .map((q) => new QuestionDTO(q)),
          },
        };

         

        this.checkoutService
          .updateProduct(productVM)
          .toPromise()
          .then((newShoppingCart) => {
            this.$store.dispatch(
              setShoppingCartCheckout({shoppingCart: newShoppingCart})
            );
            this.$store.dispatch(
              setFloorPlanCheckout({
                floorPlan: new FloorPlan({
                  url: linkObj.url,
                  name: files[0].name,
                }),
              })
            );

            this.fileName = files[0].name;
          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
          });
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }
}
