import { QuestionDTO } from './QuestionDTO.model';

export class Question implements QuestionDTO {
  public id: any;
  public question: string;
  public answer?: string;
  public isAnswerd?: boolean;
  public index?: number;
  public image_required?: boolean;

  constructor(obj: Question) {
    this.id = obj.id;
    this.question = obj.question;
    this.answer = obj.answer ?? '';
    this.isAnswerd = obj.isAnswerd ?? false;
    this.index = obj.index || null;
  }
}
