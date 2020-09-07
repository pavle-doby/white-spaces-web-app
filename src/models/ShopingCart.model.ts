export class ShoppingCart {
  public id: number;
  public datetime: string | Date;
  public state: string;
  public user_id: number;
  public line_items: any[];
}
