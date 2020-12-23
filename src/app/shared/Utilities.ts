import { BREAKING_POINT_PX } from '../app.config';

export const clone = <T>(x: T | Array<T>): T => {
  return JSON.parse(JSON.stringify(x));
};

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

export const getClientWidthPX = (): number => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};

export const isHandset = (
  breakingPoint: number = BREAKING_POINT_PX
): boolean => {
  return breakingPoint > getClientWidthPX();
};

export const firstToUpperCase = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export const isArray = (x: any): boolean => {
  return !!x && Array.isArray(x);
};

export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

export const getExtension = (fileName: string): string => {
  let ext = '';
  let isNotDot = true;
  let i = fileName.length - 1;

  while (isNotDot && i >= 0) {
    ext = ext + fileName[i];
    isNotDot = fileName[i] !== '.';
    i--;
  }

  return reverseString(ext);
};

export const isNotPresentableFile = (fileSrc: string): boolean => {
  const NOT_PRESENTABLE_FILES = ['.pdf', '.dwg'];
  return NOT_PRESENTABLE_FILES.includes(getExtension(fileSrc));
};

export const puralize = (n: number): string => {
  return n > 1 ? 's' : '';
};

export const count = (obj: Object): number => {
  return Object.values(obj).length;
};
