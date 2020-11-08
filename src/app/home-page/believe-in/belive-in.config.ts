import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';

export const LINER_GRADIENT = `linear-gradient(90deg, rgba(217,183,197,1) 0%, rgba(2,0,36,1) 0%, rgba(217,183,197,1) 0%, rgba(206,167,190,1) 100%)`;

const delayShow = 200;
const delayHide = 300;

export const BELIVE_IN_OPENING_LABELS = [
  new OpeningLabel(
    'wellbeing',
    `Happiness, health and content are very important feelings for us personally.
    We incorporated the same philosophy into our work, too.
    For us, the clients’ wellbeing comes first.
    We want to know about the way you move around the place and how you feel in it, to provide you with what you need.
    Your lifestyle will be thoroughly examined in the design process because the key-factors for creating a happy home are feelings of freedom and comfort. `,
    true,
    delayShow,
    delayHide
  ),
  new OpeningLabel(
    `funcionality`,
    `We believe everyone deserves a living space that works for, not against them.
    Regardless of the apartment size or a budget frame, style and functionality should be balanced.
    Opting for aesthetics at the expense of effectiveness won’t pay off in the long run.
    Our goal is to create a practical floor plan that lays the ground for further redecorating.`,
    false,
    delayShow,
    delayHide
  ),
  new OpeningLabel(
    `personal space`,
    `We make sure to incorporate personalized areas in floor plan designs.
    These areas are designed to support both privacy for personal growth, and a common space for gatherings.
    We organize the space in such a way that you can get closer to your family and still be able to personally develop or simply spend time on your own.`,
    false,
    delayShow,
    delayHide
  ),
  new OpeningLabel(
    `balance`,
    `One of the core values at White Space Renovation is the balance between relaxed and energized lifestyle.
    We create homes where people feel both comfortable and ready to live their lives to the fullest.
    We nurture the attitude that fully accepts and appreciates life’s complexities.
    At the same time, we respect and celebrate simplicity.`,
    false,
    delayShow,
    delayHide
  ),
  new OpeningLabel(
    `sustainability`,
    `It is widely known that society is running out of natural resources such as wood or stone.
    The building capacity is limited.
    There is too much unnecessary consumption.
    By repurposing, redesigning, and thinking green, we create a useful, new life for sustainable dwellings of the future. `,
    false,
    delayShow,
    delayHide
  ),
];
