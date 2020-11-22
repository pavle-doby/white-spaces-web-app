import { QuestionDTO } from './QuestionDTO.model';

export class Question implements QuestionDTO {
  public id: any; //for BE
  public product_id: number; //For easier update...
  public question: string; //for BE
  public answer?: string; //for BE
  public isAnswerd?: boolean;
  public index?: number;
  public image_required: boolean;
  public images?: string[]; //for BE images: string[]
  public image_name?: string;
  public section?: string; //key

  constructor(obj: Question) {
    this.id = obj.id;
    this.product_id = obj.product_id;
    this.question = obj.question;
    this.answer = obj.answer ?? '';
    this.isAnswerd = obj.isAnswerd ?? !!obj.answer;
    this.index = obj.index || null;
    this.images = obj.images ?? [];
    this.image_name = obj.image_name;
    this.image_required = obj.image_required;
    this.section = obj.section;
  }

  public static convertQuestionsDTOListToQuestionsList = (
    questionDTOList: Record<string, QuestionDTO[]>,
    product: { id: number }
  ): Question[] => {
    let buffQuestions: Question[] = [];

    Object.keys(questionDTOList).forEach((key) => {
      buffQuestions = [
        ...buffQuestions,
        ...questionDTOList[key].map((question) => {
          return new Question({
            id: question.id,
            product_id: product.id,
            question: question.question,
            image_required: question.image_required,
            section: key,
          });
        }),
      ];
    });

    return buffQuestions;
  };

  public static formatQuestionDictToList = (
    questionDTOList: Record<string, QuestionDTO[]>
  ): QuestionDTO[] => {
    let buffQuestions: QuestionDTO[] = [];

    Object.values(questionDTOList).forEach((list) => {
      buffQuestions = [...buffQuestions, ...list];
    });

    return buffQuestions;
  };

  public static calculateFinishedQuestions = (
    questions: Question[]
  ): number => {
    return questions && questions.length
      ? questions.filter((q) => Question.isQuestionFullyAnswerd(q)).length
      : 0;
  };

  public static isQuestionFullyAnswerd = (question: Question): boolean => {
    return question ? question.isAnswerd ?? !!question.answer : false;
  };
}
