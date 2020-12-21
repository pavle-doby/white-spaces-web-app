import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
  appendImageFloorPalnCheckout,
} from 'src/app/store/actions/checkout.action';
import { UploadConfig } from 'src/app/shared/upload/upload.model';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { Question } from 'src/models/Question.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { firstToUpperCase, isArray } from 'src/app/shared/Utilities';
import { IMG_LOADING } from 'src/app/app.config';
import { Image } from 'src/models/Image.model';

const INFO = 'welcome to your renovation project!';

const IMG_LIMIT = 8;

@Component({
  selector: 'app-floor-paln-upload',
  templateUrl: './floor-paln-upload.component.html',
  styleUrls: ['./floor-paln-upload.component.scss'],
})
export class FloorPalnUploadComponent implements OnInit {
  public uploadConfig: UploadConfig;
  public successMsg: string;

  public $chekcoutState: Observable<CheckoutState>;
  public subChekcoutState: Subscription;

  public $userName: Observable<string>;
  public subUserName: Subscription;

  public shoppingCart: ShoppingCart;
  public questions: Question[];

  public info: string = '';
  public description: string = '';

  public images: Image[] = [];

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$store.dispatch(setInfoCheckout({ info: INFO, description: [] }));
    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.FLOOR_PLAN })
    );

    this.$chekcoutState = this.$store.select((state) => state.checkout);
    this.$userName = this.$store.select(
      (state) => state.user?.user?.first_name
    );

    this.uploadConfig = new UploadConfig({
      limit: 8,
      message: 'Please upload your existing floor plan.',
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
      this.info = `${_name}, \n ${INFO}`;
      this.$store.dispatch(setInfoCheckout({ info: ``, description: [] }));
    });
  }

  public onUploadEvent(files: FileList): void {
    if (files.length > IMG_LIMIT) {
      alert(`Max number of images is ${IMG_LIMIT}.`);
      return;
    }

    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);

    if (!lineItem.product) {
      alert('Select package');
      return;
    }

    let liFloorPlan = lineItem.additional_data.floor_plan;
    let floor_plan = isArray(liFloorPlan) ? liFloorPlan : [];

    Object.values(files).forEach((file, fileIndex) => {
      const loadinImg = new Image({ src: IMG_LOADING });
      this.$store.dispatch(appendImageFloorPalnCheckout({ image: loadinImg }));

      this.checkoutService
        .uploadFile(file)
        .toPromise()
        .then((linkObj) => {
          floor_plan = [...floor_plan, linkObj.link];

          const productVM: ProductVM = {
            shopping_cart_id: this.shoppingCart.id,
            line_item_id: lineItem.id,
            quantity: 1,
            additional_data: {
              ...lineItem.additional_data,
              floor_plan,
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
                setShoppingCartCheckout({ shoppingCart: newShoppingCart })
              );
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
    });
  }

  public async onDeleteImageEvent(image: Image): Promise<void> {
    console.log({ image });

    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);
    let liFloorPlan = lineItem.additional_data.floor_plan;
    let floor_plan = liFloorPlan.filter((src) => src !== image.src);

    console.log({ floor_plan });

    const productVM: ProductVM = {
      shopping_cart_id: this.shoppingCart.id,
      line_item_id: lineItem.id,
      quantity: 1,
      additional_data: {
        ...lineItem.additional_data,
        floor_plan,
      },
    };

    console.log({ productVM });

    try {
      await this.checkoutService.updateProduct(productVM).toPromise;
      await this.checkoutService.deleteImage(image.src).toPromise();
    } catch (error) {
      console.error(error);
      alert('Something went wrong...');
    }
  }
}
