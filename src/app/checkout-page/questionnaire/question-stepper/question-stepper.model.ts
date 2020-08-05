export class QuestionStepper {
  public numberOfSteps: number;
  public rangeStart?: number;
  public rangeEnd?: number;
  public numberOfRangeToShow: number;
  public indexCurrent: number;

  constructor(obj: QuestionStepper) {
    this.numberOfSteps = obj.numberOfSteps;
    this.numberOfRangeToShow =
      obj.numberOfRangeToShow > this.numberOfSteps
        ? this.numberOfSteps
        : obj.numberOfRangeToShow;
    this.rangeStart = obj.rangeStart ?? 0;
    this.rangeEnd =
      obj.rangeEnd > this.numberOfSteps || !!this.rangeEnd
        ? this.numberOfSteps - 1
        : obj.rangeEnd;
    this.indexCurrent = obj.indexCurrent;
  }
}

export enum StepState {
  UNCOMPLITED = 'uncomplited',
  CURRENT = 'current',
  COMPLETED = 'complited',
}

export class Step {
  public index: number;
  public label?: string | number;
  public state?: StepState;
  public ngClassObj?: Record<string, boolean>;

  constructor(obj: Step) {
    this.index = obj.index;
    this.label = this.label ?? this.index;
    this.state = obj.state ?? StepState.UNCOMPLITED;
    const classObj = {};
    classObj[`question-stepper__step--${this.state}`] = true;
    this.ngClassObj = classObj;
  }
}
