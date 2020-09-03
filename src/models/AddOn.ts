import { Question } from './Question.model';

export class AddOn {
  public id: any;
  public name: string;
  public description: string;
  public price: number;
  public isSelected?: boolean;
  public questions: Question[];

  constructor(obj: AddOn) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.isSelected = obj.isSelected ?? false;
    this.questions = obj.questions;
  }
}
