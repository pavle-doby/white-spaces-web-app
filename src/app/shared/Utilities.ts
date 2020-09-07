import { Question } from 'src/models/Question.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';

/**
 * Generates arraye with ragne values for start to end
 * @param {numbet} start value where range starts
 * @param {numbet} end value where range ends
 * @return {number[]} range of number between start and end including them.
 */
export const range = (start: number, end: number): number[] => {
  const ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

export const convertQuestionsDTOListToQuestionsList = (
  questionDTOList: Record<string, QuestionDTO[]>
): Question[] => {
  let buffQuestionsDTO: QuestionDTO[] = [];

  Object.values(questionDTOList).forEach((questions) => {
    buffQuestionsDTO = [...buffQuestionsDTO, ...questions];
  });

  return buffQuestionsDTO.map((question) => {
    return new Question({
      id: question.id,
      question: question.question,
      image_required: question.image_required,
    });
  });
};
