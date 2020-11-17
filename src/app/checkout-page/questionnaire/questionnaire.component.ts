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
import { UploadData } from 'src/app/shared/upload/upload.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { QuestionStepper } from './question-stepper/question-stepper.model';
import { TooltipPosition } from 'src/models/TooltipPosition.model';

const INFO = `Feel free to load us with information so that we
can truly get to know you and your space. 
Tell us the details so we can extend its potential to the maximum.`;

const INFO_DESC = `Your satisfaction with the end result has to do with the amount of information you share about your apartment with us. 
You can ensure that your project is a resounding success by making us understand your needs!`;

const UPLOAD_MSG = 'Upload photo';
const UPLOAD_TOOLTIP_INFO =
  'You can upload only one photo at the moment. Please, send us the rest of them via email.';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input()
  public toShowIndex: number = 0;

  public $shoppingCartState: Observable<ShoppingCart>;
  public $subShoppingCartState: Subscription;
  public shoppingCart: ShoppingCart;

  public $questions: Observable<Question[]>;
  public $subQuestions: Subscription;
  public questions: Question[];

  public $questionStepper: Observable<QuestionStepper>;
  public $subQuestionStepper: Subscription;

  public uploadData: UploadData;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$questions = this.$store.select((state) => state.checkout.questions);
    this.$questionStepper = this.$store.select(
      (state) => state.checkout.questionStepper
    );
    this.$shoppingCartState = this.$store.select(
      (state) => state.checkout.shoppingCart
    );

    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );

    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.QUESTIONNARIE })
    );

    this.uploadData = new UploadData({
      limit: 1,
      info: '',
      bottomInfo: UPLOAD_MSG,
      uppercaseButtonText: true,
      tooltipContent: UPLOAD_TOOLTIP_INFO,
      tooltipPosition: TooltipPosition.RIGHT,
    });
  }

  ngOnDestroy(): void {
    this.$subQuestions.unsubscribe();
    this.$subQuestionStepper.unsubscribe();
    this.$subShoppingCartState.unsubscribe();
  }

  ngOnInit(): void {
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

    const newQuestions: Question[] = JSON.parse(JSON.stringify(this.questions))
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

    console.log('Q - answer', { productVM });

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

  public onUploadEvent(fileList: FileList): void {
    console.log({ fileList });

    this.checkoutService
      .uploadFile(fileList[0])
      .toPromise()
      .then((linkObj) => {
        const newQuestion = {
          ...this.questions[this.toShowIndex],
          images: [linkObj.link],
          image_name: fileList[0].name,
        };

        const lineItem = ShoppingCart.getLineItemWithProductId(
          this.shoppingCart,
          newQuestion.product_id
        );
        const additionalData = JSON.parse(
          JSON.stringify(lineItem.product.additional_data)
        );

        const newQuestions: Question[] = JSON.parse(
          JSON.stringify(this.questions)
        )
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

        console.log('Q - upload', { productVM });

        this.checkoutService
          .updateProduct(productVM)
          .toPromise()
          .then((newShoppingCart) => {
            this.$store.dispatch(
              setShoppingCartCheckout({ shoppingCart: newShoppingCart })
            );
            console.log('Pogledaj state');

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
    const imageIsUploaded = !!this.questions[this.toShowIndex]?.images?.length;
    this.uploadData.bottomInfo = imageIsUploaded
      ? this.questions[this.toShowIndex].image_name ?? UPLOAD_MSG
      : UPLOAD_MSG;
  }
}
