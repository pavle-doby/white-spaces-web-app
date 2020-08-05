export class AddOn {
  public id: any;
  public name: string;
  public description: string;
  public price: number;
  public isSelected?: boolean;

  constructor(obj: AddOn) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.isSelected = obj.isSelected ?? false;
  }
}
