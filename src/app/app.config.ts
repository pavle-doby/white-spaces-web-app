import { getClientWidthPX } from './shared/Utilities';

//export const API_URL = 'http://18.221.175.43';
export const API_URL = '';

export enum LoginParam {
  REGISTER,
  LOGIN,
}

export enum ConfirmationDilogType {
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'error',
}

export const CONFIRMATION_DIALOG_WIDTH = '500px';

export const BREAKING_POINT_PX = 960;

export const MEDIA_QUERY_WIDTH = '(max-width: 960px)';
