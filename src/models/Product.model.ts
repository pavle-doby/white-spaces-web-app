import { AdditionalData } from './AdditionalData.model';

export interface Product {
  id: number;
  name: string;
  format: any;
  quantity: number;
  price: number;
  category_id: number; //ENUM for category
  attributes: Object;
  data: {
    description: string;
  };
  additional_data: AdditionalData;
}
