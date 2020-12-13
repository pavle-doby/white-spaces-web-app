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
