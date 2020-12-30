import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
} from 'src/app/store/actions/checkout.action';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/models/Question.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { UploadConfig } from 'src/app/shared/upload/upload.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { QuestionStepper } from './question-stepper/question-stepper.model';
import { TooltipPosition } from 'src/models/TooltipPosition.model';
import { clone, isHandset, puralize } from 'src/app/shared/Utilities';
import { MAIL_FOR_CLIENTS } from 'src/app/app.config';
import { MatDialog } from '@angular/material/dialog';
import { ImageManagerDialogComponent } from 'src/app/shared/image-manager-dialog/image-manager-dialog.component';
import { ImageManagerDialogData } from 'src/models/ImageManagerDialogData.model';
import { ImageManagerConfig } from 'src/app/shared/image-manager/models/ImageManagerConfig.model';
import { ImageGridConfig } from 'src/app/shared/image-grid/models/ImageGridConfig.model';
import { Image } from 'src/models/Image.model';
import {
  CheckoutProgress,
  ProgressState,
} from 'src/models/CheckoutProgress.model';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  ConfirmationDialogType,
} from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input()
  public toShowIndex: number = 0;

  public isHandset: boolean = isHandset();

  public readonly mail: string = MAIL_FOR_CLIENTS;
  public readonly mailHref: string = `mailto:${this.mail}`;

  public $shoppingCartState: Observable<ShoppingCart>;
  public $subShoppingCartState: Subscription;
  public shoppingCart: ShoppingCart;

  public $questions: Observable<Question[]>;
  public $subQuestions: Subscription;
  public questions: Question[];

  public $questionStepper: Observable<QuestionStepper>;
  public $subQuestionStepper: Subscription;

  public $progressState: Observable<CheckoutProgress>;
  public $subProgressState: Subscription;

  public questionMsg: string =
    'Make sure you fill out the questionnaire in detail, so we can fully understand your needs.\nThere are 10 sections in total (together with the add-on packages).\nThe number of questions may vary per category.';

  public manageInfo: string;
  public manageTooltipInfo: string;
  public mangeTooltipPosition: TooltipPosition = TooltipPosition.RIGHT;

  public subDialog: Subscription;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService,
    private readonly dialog: MatDialog
  ) {
    this.$questions = this.$store.select((state) => state.checkout.questions);
    this.$questionStepper = this.$store.select(
      (state) => state.checkout.questionStepper
    );
    this.$shoppingCartState = this.$store.select(
      (state) => state.checkout.shoppingCart
    );
    this.$progressState = this.$store.select(
      (state) => state.checkout.progressState
    );

    this.$store.dispatch(setInfoCheckout({ info: '', description: [] }));

    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.QUESTIONNARIE })
    );
  }

  ngOnDestroy(): void {
    this.$subQuestions.unsubscribe();
    this.$subQuestionStepper.unsubscribe();
    this.$subShoppingCartState.unsubscribe();
    this.$subProgressState.unsubscribe();

    if (this.subDialog) this.subDialog.unsubscribe();
  }

  ngOnInit(): void {
    this.$subProgressState = this.$progressState.subscribe((progressState) => {
      if (progressState.questions.state !== ProgressState.DONE) {
        return;
      }
      this.dialog.open(ConfirmationDialogComponent, {
        data: new ConfirmationDialogData({
          titleLabel: 'Congratulations!',
          message: 'You answered all questions!',
          type: ConfirmationDialogType.INFO,
        }),
      });
    });

    this.$subShoppingCartState = this.$shoppingCartState.subscribe(
      (shoppingCart) => {
        this.shoppingCart = shoppingCart;
      }
    );

    this.$subQuestions = this.$questions.subscribe((questions) => {
      this.questions = questions;
      this.chagneUploadInfo();
    });

    this.$subQuestionStepper = this.$questionStepper.subscribe(
      (questStepper) => {
        this.toShowIndex = questStepper.indexCurrent;
      }
    );

    this.chagneUploadInfo();
  }

  public onChangeAnswer(question: Question): void {
    const lineItem = ShoppingCart.getLineItemWithProductId(
      this.shoppingCart,
      question.product_id
    );

    const newQuestions: Question[] = clone<Question[]>(this.questions)
      .filter((q) => q.product_id === lineItem.product.id)
      .map((q) => {
        return q.id === question.id ? { ...question } : { ...q };
      });

    const productVM: ProductVM = {
      shopping_cart_id: this.shoppingCart.id,
      product_id: question.product_id,
      line_item_id: lineItem.id,
      additional_data: {
        ...lineItem.additional_data,
        questions: newQuestions.map((q) => new QuestionDTO(q)),
      },
      quantity: 1,
    };

    this.checkoutService
      .updateProduct(productVM)
      .toPromise()
      .then((newShoppingCart) => {
        this.$store.dispatch(
          setShoppingCartCheckout({ shoppingCart: newShoppingCart })
        );
        this.$store.dispatch(
          updateQuestionCheckout({ question: { ...question } })
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  public moveQuestionTo(index: number): void {
    this.toShowIndex =
      index >= 0 ? index % this.questions.length : this.questions.length - 1;

    this.$store.dispatch(
      setCurrentIndexCheckout({ currentIndex: this.toShowIndex })
    );

    this.chagneUploadInfo();
  }

  public openUploadModal(): void {
    const quetion = this.questions[this.toShowIndex];
    const images = quetion.images.map((src) => new Image({ src }));

    const dialogRef = this.dialog.open(ImageManagerDialogComponent, {
      disableClose: true,
      data: new ImageManagerDialogData({
        images,
        title: 'File Manager',
        managerConfig: new ImageManagerConfig({
          dialogOneColMode: this.isHandset,
        }),
        uploadConfig: new UploadConfig({
          limit: 16,
          info: '',
          uppercaseButtonText: true,
        }),
        gridConfig: new ImageGridConfig({ limit: 16 }),
      }),
    });

    this.subDialog = dialogRef.afterClosed().subscribe((imageBuff: Image[]) => {
      if (!imageBuff) {
        return;
      }

      const images = imageBuff.map((img) => img.src);

      const newQuestion = {
        ...this.questions[this.toShowIndex],
        images,
      };

      const lineItem = ShoppingCart.getLineItemWithProductId(
        this.shoppingCart,
        newQuestion.product_id
      );

      const newQuestions: Question[] = clone<Question[]>(this.questions)
        .filter((q) => q.product_id === lineItem.product.id)
        .map((q) => {
          return q.id === newQuestion.id ? { ...newQuestion } : { ...q };
        });

      const productVM: ProductVM = {
        shopping_cart_id: this.shoppingCart.id,
        product_id: newQuestion.product_id,
        line_item_id: lineItem.id,
        additional_data: {
          ...lineItem.additional_data,
          questions: newQuestions.map((q) => new QuestionDTO(q)),
        },
        quantity: 1,
      };

      this.checkoutService
        .updateProduct(productVM)
        .toPromise()
        .then((newShoppingCart) => {
          this.$store.dispatch(
            setShoppingCartCheckout({ shoppingCart: newShoppingCart })
          );

          this.$store.dispatch(
            updateQuestionCheckout({ question: { ...newQuestion } })
          );
        })
        .catch((err) => {
          console.error(err);
          alert(err.message);
        });
    });
  }

  private chagneUploadInfo(): void {
    const filesCount = this.questions[this.toShowIndex]?.images?.length;

    this.manageInfo = !!filesCount
      ? `You uploaded ${filesCount} file${puralize(filesCount)}`
      : `No uploaded files`;
    this.manageTooltipInfo = 'Here you can manage files for question.';
  }
}
