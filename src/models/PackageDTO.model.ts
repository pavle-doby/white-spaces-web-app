import { QuestionDTO } from './QuestionDTO.model';

export interface PackageDTO {
  id: number;
  name: string;
  format: Object;
  data: {
    description: string;
  };
  additional_data: {
    questions: Record<string, QuestionDTO[]>;
  };
  quantity: number;
  price: number;
  category_id: number; //ENUM for category
  attributes: Object;
}
