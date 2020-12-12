import { AddOnDTO } from './AddOnDTO';
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

  public static compare(a: AddOn, b: AddOn): number {
    return a.name.localeCompare(b.name);
  }

  public static covertAddOnDTOToAddOn(
    addOnDTO: AddOnDTO,
    isSelected: boolean = false
  ): AddOn {
    const questions = Question.convertQuestionsDTOListToQuestionsList(
      addOnDTO.additional_data.questions,
      addOnDTO
    );
    return new AddOn({
      id: addOnDTO.id,
      name: addOnDTO.name,
      description: addOnDTO.data?.description,
      price: addOnDTO.price,
      isSelected,
      questions,
    });
  }
}
