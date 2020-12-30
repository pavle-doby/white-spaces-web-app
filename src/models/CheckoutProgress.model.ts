import { TabbarText } from './TabbarText.model';

export enum ProgressState {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export class Step {
  public name: TabbarText;
  public isRequired: boolean;
  public state: ProgressState;
  public total?: number;
  public finshed?: number;

  constructor(obj: Step) {
    this.isRequired = obj.isRequired;
    this.name = obj.name;
    this.state = obj.state;
    this.total = obj.total;
    this.finshed = obj.finshed;

    if (this.total && this.finshed) {
      this.state =
        this.total === this.finshed ? ProgressState.DONE : ProgressState.TODO;
    }
  }
}

export class CheckoutProgress {
  public floorPlan: Step;
  public spacePhotos: Step;
  public addOns: Step;
  public questions: Step;

  constructor(obj: CheckoutProgress) {
    this.floorPlan = obj.floorPlan;
    this.spacePhotos = obj.spacePhotos;
    this.addOns = obj.addOns;
    this.questions = obj.questions;
  }
}
