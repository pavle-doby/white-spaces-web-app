export interface QuestionDTO {
  id: number;
  image_required?: boolean;
  question: string;
  answer?: string;
  images?: string[];
  section?: string;
}
