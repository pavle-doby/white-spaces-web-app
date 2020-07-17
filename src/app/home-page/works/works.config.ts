export const WORKS_LINEAR_GRADIENT = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,183,197,1) 0%, rgba(105,103,165,1) 0%, rgba(67,74,144,1) 100%)`;
export const WORKS_NUMBER_ARRAY = [1, 2, 3, 4, 5];
export const WORKS_DESCRIPTION_ARRAY = [
  'Upload floor plan',
  'Upload photos',
  'Fill out questionnaire',
  'Add ons',
  'Review & pay',
];
export const WORKS_IMAGES_ARRAY = [
  '../../../../assets/images/uploadFloorPlan.png',
  '../../../assets/images/uploadPhotos.png',
  '../../../assets/images/fillOutQuestionaire.png',
  '../../../assets/images/addOns.png',
  '../../../assets/images/reviewPay.png',
];

export interface IImageDescription {
  number: number;
  description: string;
  image: string;
}

export const WORKS_IMAGE_DESCRIPTION: IImageDescription[] = [
  {
    number: 1,
    description: 'Upload floor \n plan',
    image: '../../../assets/images/home/uploadFloorPlan.png',
  },
  {
    number: 2,
    description: 'Upload \n photos',
    image: '../../../assets/images/home/uploadPhotos.png',
  },
  {
    number: 3,
    description: 'Fill out \n questionnaire',
    image: '../../../assets/images/home/fillOutQuestionaire.png',
  },
  {
    number: 4,
    description: 'Add \n ons',
    image: '../../../assets/images/home/addOns.png',
  },
  {
    number: 5,
    description: 'Review \n & pay',
    image: '../../../assets/images/home/reviewPay.png',
  },
];
