import { AdditionalData } from './AdditionalData.model';

export class ProductVM {
  public shopping_cart_id: number; // id shopping carta iz prethodnog poziva
  public product_id?: number; // id selektovanog proizvoda (paketa ili addona)
  public line_item_id?: number; // for update
  public quantity?: number = 1; // ovo fiksirajte na 1
  public additional_data: AdditionalData = {}; // ostavite prazan objekat, ne null kad se dodaje novi product

  constructor(obj: ProductVM) {
    this.shopping_cart_id = obj.shopping_cart_id;
    this.product_id = obj.product_id;
    this.line_item_id = obj.line_item_id;
    this.additional_data = obj.additional_data;
    this.quantity = obj.quantity;
  }
}
