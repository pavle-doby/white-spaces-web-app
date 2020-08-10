import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setAnswerCheckout,
  setCurrentIndexCheckout,
} from 'src/app/store/actions/checkout.action';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { Question } from 'src/models/Question';

const INFO = `Feel free to load us with information so that we
can truly get to know both you and your space
and extend its pontential to maximum.`;

const INFO_DESC = `Note that providing us with lots of information will lead
to complete understanding of your needs and 100% project success`;

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

  constructor(private readonly $store: Store<AppState>) {
    this.$questions = this.$store.select((state) => state.checkout.questions);
    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );
  }

  ngOnDestroy(): void {
    if (this.$subQuestions) this.$subQuestions.unsubscribe();
  }

  ngOnInit(): void {
    this.$subQuestions = this.$questions.subscribe((questions) => {
      this.questions = questions;
    });
  }

  public onChangeAnswer(question: Question): void {
    this.$store.dispatch(setAnswerCheckout({ question: { ...question } }));
  }

  public moveQuestionTo(index: number): void {
    this.toShowIndex =
      index >= 0 ? index % this.questions.length : this.questions.length - 1;

    this.$store.dispatch(
      setCurrentIndexCheckout({ currentIndex: this.toShowIndex })
    );
  }
}
