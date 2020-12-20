import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  clearSpacePhotosURLsCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
} from 'src/app/store/actions/checkout.action';
import { UploadConfig } from 'src/app/shared/upload/upload.model';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { Question } from 'src/models/Question.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';

const INFO = `Please upload photos of your space.`;

const INFO_DESC_0 = `Take photos from as many different angles as possible.
Take photos in different periods during the day so that we can feel the light changes within the rooms.`;

export const SUPPERTED_FILES = '.jpg, .jpeg, .png ';

@Component({
  selector: 'app-space-photos',
  templateUrl: './space-photos.component.html',
  styleUrls: ['./space-photos.component.scss'],
})
export class SpacePhotosComponent implements OnInit, OnDestroy {
  public $checkoutState: Observable<CheckoutState>;
  public subChekcoutState: Subscription;

  public shoppingCart: ShoppingCart;
  public questions: Question[];
  public uploadConfigData: UploadConfig;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly chekcoutService: CheckoutService
  ) {
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC_0] })
    );
    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.SPACE_PHOTOS })
    );
    this.$checkoutState = this.$store.select((state) => state.checkout);

    this.uploadConfigData = new UploadConfig({
      supportedFileTypes: SUPPERTED_FILES,
      limit: 16,
    });
  }

  ngOnInit(): void {
    this.subChekcoutState = this.$checkoutState.subscribe((ckState) => {
      this.shoppingCart = ckState.shoppingCart;
      this.questions = ckState.questions;
    });
  }

  ngOnDestroy(): void {
    if (this.subChekcoutState) this.subChekcoutState.unsubscribe();
  }

  public onUploadFilesEvent(files: FileList): void {
    if (files.length > 16) {
      alert('Max number of photos is 16.');
      return;
    }

    //#region For shopping cart update I
    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);

    if (!lineItem.product) {
      alert('Select package');
      return;
    }
    //#endregion

    this.$store.dispatch(clearSpacePhotosURLsCheckout({}));
    let fileLinks: string[] = [];

    Object.values(files).forEach((file) => {
      this.chekcoutService
        .uploadFile(file)
        .toPromise()
        .then((file) => {
          fileLinks = [...fileLinks, file.link];

          //#region For shopping cart update II
          const productVM: ProductVM = {
            shopping_cart_id: this.shoppingCart.id,
            line_item_id: lineItem.id,
            quantity: 1,
            additional_data: {
              ...lineItem.additional_data,
              images: fileLinks,
              questions: this.questions
                .filter((q) => q.product_id === lineItem.product.id)
                .map((q) => new QuestionDTO(q)),
            },
          };

          this.chekcoutService
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
          //#endregion
        })
        .catch((error) => {
          console.error(error);
          alert(error.messages);
        });
    });
  }
}
