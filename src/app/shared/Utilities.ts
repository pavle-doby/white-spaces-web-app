import { Question } from 'src/models/Question.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { TabbarButton } from './tabbar/tabbar.content';

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

export const convertQuestionDTODictionaryToQuestionDTOList = (
  questionDTOList: Record<string, QuestionDTO[]>
): QuestionDTO[] => {
  let buffQuestions: QuestionDTO[] = [];

  Object.values(questionDTOList).forEach((list) => {
    buffQuestions = [...buffQuestions, ...list];
  });

  return buffQuestions;
};

export const updateTabbarBtnComplitedState = (
  tabbarBtnList: TabbarButton[],
  btnText: TabbarText,
  isComplited: boolean = true
): TabbarButton[] => {
  return tabbarBtnList.map((btn: TabbarButton) => {
    return btn.text === btnText
      ? { ...btn, isCompleted: isComplited }
      : { ...btn };
  });
};
