export class QuestionDTO {
  public id: number;
  public image_required?: boolean;
  public question: string;
  public product_id: number; //New
  public answer?: string;
  public images?: string[];
  public section?: string;

  constructor(obj: QuestionDTO) {
    this.id = obj.id;
    this.image_required = obj.image_required;
    this.question = obj.question;
    this.product_id = obj.product_id;
    this.answer = obj.answer;
    this.images = obj.images;
    this.section = obj.section;
  }
}
