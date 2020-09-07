import { QuestionDTO } from './QuestionDTO.model';
import { PackageType } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';

export interface PackageDTO {
  id: number;
  name: string;
  format: Object;
  data: {
    description: string;
  };
  additional_data: {
    questions: Record<string, QuestionDTO[]>;
    type: PackageType;
  };
  quantity: number;
  price: number;
  category_id: number; //ENUM for category
  attributes: Object;
}
