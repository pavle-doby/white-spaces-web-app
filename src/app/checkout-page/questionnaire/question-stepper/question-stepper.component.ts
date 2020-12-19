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
import { firstToUpperCase, isHandset, range } from 'src/app/shared/Utilities';
import { Question } from 'src/models/Question.model';
import { SECTION_LABEL_MAP } from 'src/enums/QuestionSection.enum';

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

  public section: string;

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

      this.stepper = checkoutState.questionStepper;
      const section = checkoutState.questionStepper.currentSection;
      this.section = SECTION_LABEL_MAP[section] ?? firstToUpperCase(section);

      const questions = checkoutState.questions;

      let indexCurrent = this.stepper.indexCurrent;
      let toShow = this.stepper.numberOfRangeToShow;

      let start = this.stepper.rangeStart;
      let end = start + toShow;

      end = indexCurrent > end ? indexCurrent + toShow : end;
      end = end > this.stepper.rangeEnd ? this.stepper.rangeEnd : end;
      
      start = end - toShow;
      start = start < this.stepper.rangeStart ? this.stepper.rangeStart : start;

      const sectionRanges =
        checkoutState.questionStepper.dictSectionRanges[section];

      const rangeArray = range(start, end);
      this.steps = rangeArray.map(
        (i): Step => {
          let stepState;
          let label = sectionRanges.labelMap[questions[i].id];

          if (this.stepper.indexCurrent === i) {
            stepState = StepState.CURRENT;
          } else if (Question.isQuestionFullyAnswerd(questions[i])) {
            stepState = StepState.COMPLETED;
          } else {
            stepState = StepState.UNCOMPLITED;
          }

          return new Step({ index: i, label, state: stepState });
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
