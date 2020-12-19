export enum QuestionSection {
  TEHNICALITIES = 'technicalities',
  BATHROOM = 'bathroom',
  KITCHEN = 'kitchen',
  STORAGE = 'storage',
  FURNITURE = 'furniture',
  PERSONAL = 'personal',
  THE_BUGET = 'the budget',
  KITCHEN_ADD_ON = 'kitchen add on',
  CLOSET = 'closet',
  LIGHTNING = 'lightning',
}

export const SECTION_LABEL_MAP = {
  [QuestionSection.TEHNICALITIES]: 'Space Distribution and Technicalities',
  [QuestionSection.BATHROOM]: 'Bathroom',
  [QuestionSection.KITCHEN]: 'Kitchen',
  [QuestionSection.STORAGE]: 'Storage',
  [QuestionSection.FURNITURE]: 'Furniture',
  [QuestionSection.PERSONAL]: 'Let’s get a bit more personal',
  [QuestionSection.THE_BUGET]: 'The budget',
  [QuestionSection.KITCHEN_ADD_ON]: 'A  bit more about the kitchen',
  [QuestionSection.CLOSET]: 'Closet',
  [QuestionSection.LIGHTNING]: 'Lighting',
};
