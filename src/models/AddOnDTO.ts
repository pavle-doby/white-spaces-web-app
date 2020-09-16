import { QuestionDTO } from './QuestionDTO.model';
import { Product } from './Product.model';
import { PackageType } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';

export class AddOnDTO implements Product {
  public id: number;
  public name: string;
  public format: {};
  public data: {
    description: string;
  };
  public quantity: number;
  public price: number;
  public category_id: number;
  public attributes: Object;

  public additional_data: {
    questions: Record<string, QuestionDTO[]>;
  };
}
