export class Blog {
  public id: number;
  public title: string;
  public text: string; //innerHTML
  public date: Date;

  public constructor(obj: Blog) {
    this.id = obj.id;
    this.title = obj.title;
    this.text = obj.text;
    this.date = obj.date;
  }
}
