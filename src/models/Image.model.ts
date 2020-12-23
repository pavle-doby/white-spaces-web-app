export class Image {
  public src: string;
  public srcToShow?: string;
  public alt?: string;
  public id?: string;
  public name?: string;

  constructor(obj: Image) {
    this.src = obj.src;
    this.srcToShow = obj.srcToShow ?? obj.src;
    this.alt = obj.alt;
    this.id = obj.id;
    this.name = obj.name;
  }
}
