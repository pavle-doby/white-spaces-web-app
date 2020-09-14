import { Product } from './Product.model';

export class LineIntem {
  public id: number;
  public quantity: number = 1;
  public price: number;
  public additional_data: any;
  public shopping_cart_id: number;
  public product: Product;
}
