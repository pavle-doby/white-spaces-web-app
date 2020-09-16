import { AdditionalData } from './AdditionalData.model';
import { Product } from './Product.model';

export class LineIntem {
  public id: number;
  public quantity: number = 1;
  public price: number;
  public additional_data: AdditionalData;
  public shopping_cart_id: number;
  public product: Product;
}
