import React, { FC, useEffect, useState } from 'react';

interface IQuestion {
  name: string;
  link: string;
}

interface ICategory {
  id: number;
  name: string;
  questions: IQuestion[];
}

const PopularQuestionsCategoryMock: ICategory[] = [
  {
    id: 1,
    name: 'Заказы',
    questions: [
      {
        name: 'Вопрос 1',
        link: '#1',
      },
      {
        name: 'Вопрос 2',
        link: '#2',
      },
      {
        name: 'Вопрос 3',
        link: '#2',
      },
      {
        name: 'Вопрос 4',
        link: '#2',
      },
      {
        name: 'Вопрос 5',
        link: '#2',
      },
      {
        name: 'Вопрос 6',
        link: '#2',
      },
      {
        name: 'Вопрос 7',
        link: '#2',
      },
    ],
  },
  {
    id: 2,
    name: 'Доставка',
    questions: [
      {
        name: 'Вопрос 1',
        link: '#3',
      },
      {
        name: 'Вопрос 2',
        link: '#4',
      },
    ],
  },
  {
    id: 3,
    name: 'Оплата',
    questions: [
      {
        name: 'Вопрос 1',
        link: '#5',
      },
      {
        name: 'Вопрос 2',
        link: '#6',
      },
    ],
  },
];

/**
 * Компонент популярных вопрос пользователей
 * Реализован в виде табов
 *
 * @constructor
 */
const PopularQuestionsBox: FC = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>();

  useEffect(() => {
    const defaultTab = `tab_${PopularQuestionsCategoryMock[0].id}`;
    setActiveTab(defaultTab);
  }, [PopularQuestionsCategoryMock]);

  const clickTab = (event: React.MouseEvent<HTMLLIElement>) => {
    const targetTab = event.currentTarget.dataset.name;
    setActiveTab(targetTab);
  };

  return (
    <div className="m-1 border-2 rounded flex justify-between  h-[116px] ">
      <div className="whitespace-nowrap w-[160px]">
        <ul className="flex flex-col place-content-around h-full">
          {PopularQuestionsCategoryMock.map((category: ICategory) => (
            <li
              key={category.id}
              data-name={`tab_${category.id}`}
              className={`pl-2 leading-1 h-full  border-r cursor-pointer flex columns items-center justify-between whitespace-nowrap hover:font-semibold 
              ${activeTab === `tab_${category.id}` ? 'font-semibold border-r-0 border-t border-b first:border-b first:border-t-0 last:border-b-0 bg-gray-light' : ''}`}
              onClick={clickTab}
            >
              {category.name}
              {activeTab === `tab_${category.id}` ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-[15px] h-[15px] "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full overflow-y-auto bg-gray-light">
        {PopularQuestionsCategoryMock.map((category: ICategory) => (
          <div
            key={category.id}
            data-name={`tab_${category.id}`}
            className={`${activeTab !== `tab_${category.id}` && 'hidden'}`}
          >
            {category.questions.map((question, index) => (
              <a
                className="relative block leading-[16px] align-middle text-xs hover:font-semibold ml-2 my-1  pl-[15px] after:block after:top-1/2 after:left-0 after:translate-y-[-50%] after:absolute after:w-[10px] after:h-[10px] after:bg-green-300"
                key={index}
                href={question.link}
              >
                {question.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularQuestionsBox;
