export class OrderVM {
  public shopping_cart_id: number;
  private additional_data?: unknown = null; // za ovaj projekat je nebitno, saljite null

  constructor(obj: OrderVM) {
    this.shopping_cart_id = obj.shopping_cart_id;
    this.additional_data = null;
  }
}
