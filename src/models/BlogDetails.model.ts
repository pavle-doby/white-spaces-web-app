export class BlogDetails {
  public id: number;
  public title: string;
  public innterHTML: string;

  public constructor(obj: BlogDetails) {
    this.id = obj.id;
    this.title = obj.title;
    this.innterHTML = obj.innterHTML;
  }
}
