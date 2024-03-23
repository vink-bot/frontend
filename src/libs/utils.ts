import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Возращение текущей даты в формате yyyy-mm-dd
 */
export const getDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};

/**
 * @param date - дата к которой нужно прибавить
 * @param days - количество дней для добавления
 */
export const addDays = (date: string, days: number): string => {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);
  return resultDate.toISOString().slice(0, 10);
};
