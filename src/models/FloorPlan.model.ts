export class FloorPlan {
  public url: string;
  public name: string;

  constructor(obj: FloorPlan) {
    this.url = obj.url;
    this.name = obj.name;
  }
}
