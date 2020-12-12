import { QuestionDTO } from './QuestionDTO.model';
import { PackageType } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { Product } from './Product.model';
import { AdditionalData } from './AdditionalData.model';

export class PackageDTO implements Product {
  public id: number;
  public name: string;
  public format: Object;
  public data: {
    description: string;
  };
  public quantity: number;
  public price: number;
  public category_id: number; //ENUM for category
  public attributes: Object;

  public additional_data: AdditionalData;
}
