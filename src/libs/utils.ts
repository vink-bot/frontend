import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирование даты в формат "yyyy-mm-dd HH:mm"
 * @param date
 */
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * Возвращает текущую дату и время в формате "yyyy-mm-dd HH:mm"
 */
export const getDate = (): string => {
  return formatDate(new Date());
};

/**
 * Добавляет указанное количество дней к дате и возвращает новую дату и время в формате "yyyy-mm-dd HH:mm"
 * @param date - дата к которой нужно прибавить
 * @param days - количество дней для добавления
 */
export const addDays = (date: string, days: number): string => {
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);
  return formatDate(resultDate);
};
