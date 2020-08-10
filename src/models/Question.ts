export class Question {
  public id: any;
  public question: string;
  public answer?: string;
  public isAnswerd?: boolean;
  public index?: number;

  constructor(obj: Question) {
    this.id = obj.id;
    this.question = obj.question;
    this.answer = obj.answer ?? '';
    this.isAnswerd = obj.isAnswerd ?? false;
    this.index = obj.index || null;
  }
}
