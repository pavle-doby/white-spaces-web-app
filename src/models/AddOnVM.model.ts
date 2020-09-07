export class AddOnVM {
  public shopping_cart_id: number; // id shopping carta iz prethodnog poziva
  public product_id: number; // id selektovanog proizvoda (paketa ili addona)
  private quantity: 1; // ovo fiksirajte na 1
  private additional_data: {}; // ostavite prazan objekat, ne null

  constructor({ shopping_cart_id, product_id }) {
    this.shopping_cart_id = shopping_cart_id;
    this.product_id = product_id;
  }
}
