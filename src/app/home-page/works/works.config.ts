export const WORKS_LINEAR_GRADIENT = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,183,197,1) 0%, rgba(105,103,165,1) 0%, rgba(67,74,144,1) 100%)`;
export const WORKS_NUMBER_ARRAY = [1, 2, 3, 4, 5];
export const WORKS_DESCRIPTION_ARRAY = [
  'Upload floor plan',
  'Upload photos',
  'Add ons',
  'Fill out questionnaire',
  'Review & pay',
];
export const WORKS_IMAGES_ARRAY = [
  'assets/images/uploadFloorPlan.png',
  'assets/images/uploadPhotos.png',
  'assets/images/addOns.png',
  'assets/images/fillOutQuestionaire.png',
  'assets/images/reviewPay.png',
];

export interface IImageDescription {
  number: number;
  description: string;
  image: string;
}

export const WORKS_IMAGE_DESCRIPTION: IImageDescription[] = [
  {
    number: 1,
    description: 'UPLOAD \nFLOOR PLAN',
    image: 'assets/images/home/uploadFloorPlan.png',
  },
  {
    number: 2,
    description: 'UPLOAD \nPHOTOS',
    image: 'assets/images/home/uploadPhotos.png',
  },
  {
    number: 3,
    description: 'OPTIONAL \nADD-ONS',
    image: 'assets/images/home/addOns.png',
  },
  {
    number: 4,
    description: 'FILL OUT THE \nQUESTIONNAIRE',
    image: 'assets/images/home/fillOutQuestionaire.png',
  },
  {
    number: 5,
    description: 'REVIEW & \nPAY',
    image: 'assets/images/home/reviewPay.png',
  },
];
