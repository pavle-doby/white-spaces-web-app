import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { QuestionStepper, Step, StepState } from './question-stepper.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { range } from 'src/app/shared/Utilities';

@Component({
  selector: 'app-question-stepper',
  templateUrl: './question-stepper.component.html',
  styleUrls: ['./question-stepper.component.scss'],
})
export class QuestionStepperComponent implements OnInit, OnDestroy {
  @Input()
  public stepper: QuestionStepper;

  @Output()
  public selectStepEvent: EventEmitter<Step>;

  public $questionStepper: Observable<QuestionStepper>;
  public $subQuestionStepper: Subscription;

  public $checkoutState: Observable<CheckoutState>;
  public $subCheckoutState: Subscription;
  public checkoutState: CheckoutState;

  public steps: Step[];

  constructor(private readonly $store: Store<AppState>) {
    this.$questionStepper = this.$store.select(
      (state) => state.checkout.questionStepper
    );
    this.$checkoutState = this.$store.select((state) => state.checkout);

    this.selectStepEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.$subCheckoutState = this.$checkoutState.subscribe((checkoutState) => {
      this.checkoutState = checkoutState;
      this.stepper = this.checkoutState.questionStepper;
      const questions = this.checkoutState.questions;

      const rangeArray = range(this.stepper.rangeStart, this.stepper.rangeEnd);
      this.steps = rangeArray.map(
        (i): Step => {
          let stepState;

          if (questions[i].isAnswerd) {
            stepState = StepState.COMPLETED;
          } else if (this.stepper.indexCurrent === i) {
            stepState = StepState.CURRENT;
          } else {
            stepState = StepState.UNCOMPLITED;
          }

          return new Step({ index: i, label: i, state: stepState });
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.$subQuestionStepper) this.$subQuestionStepper.unsubscribe();
  }

  public selectStep(step: Step): void {
    this.selectStepEvent.emit(step);
  }
}
