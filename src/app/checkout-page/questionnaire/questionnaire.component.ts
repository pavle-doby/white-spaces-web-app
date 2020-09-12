import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
} from 'src/app/store/actions/checkout.action';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Question } from 'src/models/Question.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { UploadData } from 'src/app/shared/upload/upload.model';

const INFO = `Feel free to load us with information so that we
can truly get to know both you and your space
and extend its pontential to maximum.`;

const INFO_DESC = `Note that providing us with lots of information will lead
to complete understanding of your needs and 100% project success`;

const IMAGE_IS_REQUIRED = 'Image is required.';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input()
  public toShowIndex: number = 0;

  public $questions: Observable<Question[]>;
  public $subQuestions: Subscription;
  public questions: Question[];

  public uploadData: UploadData;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$questions = this.$store.select((state) => state.checkout.questions);
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );

    this.uploadData = new UploadData({
      limit: 1,
      info: '',
      bottomInfo: IMAGE_IS_REQUIRED,
      uppercaseButtonText: true,
    });
  }

  ngOnDestroy(): void {
    if (this.$subQuestions) this.$subQuestions.unsubscribe();
  }

  ngOnInit(): void {
    this.$subQuestions = this.$questions.subscribe((questions) => {
      this.questions = questions;
      this.chagneUploadInfo();
    });

    this.chagneUploadInfo();
  }

  public onChangeAnswer(question: Question): void {
    this.$store.dispatch(updateQuestionCheckout({ question: { ...question } }));
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
    this.checkoutService
      .uploadFile(fileList[0])
      .toPromise()
      .then((linkObj) => {
        const newQuestion = {
          ...this.questions[this.toShowIndex],
          images: [linkObj.link],
          image_name: fileList[0].name,
        };
        this.$store.dispatch(updateQuestionCheckout({ question: newQuestion }));
      });
  }

  private chagneUploadInfo(): void {
    const imageIsUploaded = !!this.questions[this.toShowIndex]?.images?.length;
    this.uploadData.bottomInfo = imageIsUploaded
      ? this.questions[this.toShowIndex].image_name ?? IMAGE_IS_REQUIRED
      : IMAGE_IS_REQUIRED;
  }
}
