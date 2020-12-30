import { AdditionalData } from './AdditionalData.model';

export interface Product {
  id: number;
  name: string;
  format: any;
  data: {
    description: string;
  };
  quantity: number;
  price: number;
  category_id: number; //ENUM for category
  attributes: Object;

  additional_data: AdditionalData;
}
