import { OpeningLabel } from 'src/app/shared/opening-label/OpeningLabel';
export const YOU_GET_LINEAR_GRADIENT = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,183,197,1) 0%, rgba(96,96,160,1) 0%, rgba(15,13,59,1) 100%)`;
export const YOU_GET_OPENING_LABELS = [
  new OpeningLabel(
    '1 // A professional AutoCAD drawing of the original floor plan',
    `We provide you with the professional drawing of your place. However, you need to submit a sketch or the original floor plan beforehand.`,
    true
  ),
  new OpeningLabel(
    `2 // A floor plan with furniture layout`,
    `This plan presents preliminary options for space distribution and furniture layout. Required calculations are also included.`
  ),
  new OpeningLabel(
    `3 // A separate floor plan with furniture dimensions`,
    `A preliminary floor plan design with elaborate measurements lets you find and fit the right furniture pieces easily.`
  ),
  new OpeningLabel(
    `4 // A floor plan with in-depth measurements `,
    `A floor plan with thorough measurements of floors, walls, etc. ensures precise communication with the contractor.`
  ),
  new OpeningLabel(
    `5 // A demolition and a reconstruction plan`,
    `You will receive a scaled floor plan which highlights advised wall demolitions and/or reconstructions in different colors.`
  ),
  new OpeningLabel(
    `6 // A written description of the project`,
    `We will also send a written project description from your architect with elaborate solutions and tips.`
  ),
];
