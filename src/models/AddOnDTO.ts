import { QuestionDTO } from './QuestionDTO.model';

export class AddOnDTO {
  public id: number;
  public name: string;
  public format: {};
  public data: {
    description: string;
  };
  public additional_data: {
    questions: Record<string, QuestionDTO>;
  };
  public quantity: number;
  public price: number;
  public category_id: number;
  public attributes: Object;
}
