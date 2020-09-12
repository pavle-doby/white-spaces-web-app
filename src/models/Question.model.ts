import { QuestionDTO } from './QuestionDTO.model';

export class Question implements QuestionDTO {
  public id: any; //for BE
  public question: string; //for BE
  public answer?: string; //for BE
  public isAnswerd?: boolean;
  public index?: number;
  public image_required: boolean;
  public images?: string[]; //for BE images: string[]
  public image_name?: string;
  public section?: string; //key

  constructor(obj: Question) {
    this.id = obj.id;
    this.question = obj.question;
    this.answer = obj.answer ?? '';
    this.isAnswerd = obj.isAnswerd ?? false;
    this.index = obj.index || null;
    this.images = obj.images ?? [];
    this.image_name = obj.image_name;
    this.image_required = obj.image_required;
    this.section = obj.section;
  }
}
