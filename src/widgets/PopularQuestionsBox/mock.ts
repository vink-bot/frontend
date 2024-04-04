interface IQuestion {
  id: number;
  name: string;
}

interface ICategory {
  id: number;
  name: string;
  questions: IQuestion[];
}

// Моковые данные о категориях и вопросах
export const PopularQuestionsCategoryMock: ICategory[] = [
  {
    id: 1,
    name: 'Заказы',
    questions: [
      { id: 101, name: 'Вопрос 1' },
      { id: 102, name: 'Вопрос 2' },
      { id: 103, name: 'Вопрос 3' },
      { id: 104, name: 'Вопрос 4' },
      { id: 105, name: 'Вопрос 5' },
      { id: 106, name: 'Вопрос 6' },
      { id: 107, name: 'Вопрос 7' },
    ],
  },
  {
    id: 2,
    name: 'Доставка',
    questions: [
      { id: 201, name: 'Вопрос 1' },
      { id: 202, name: 'Вопрос 2' },
    ],
  },
  {
    id: 3,
    name: 'Оплата',
    questions: [
      { id: 301, name: 'Вопрос 1' },
      { id: 302, name: 'Вопрос 2' },
    ],
  },
];
