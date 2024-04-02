import { FC, useEffect, useState } from 'react';
import { useChat } from '../../shared/lib/hooks/useChat.ts';
import TabCategory from '../../entities/Tabs/TabCategory/TabCategory.tsx';
import TabItem from '../../entities/Tabs/TabItem/TabItem.tsx';

interface IQuestion {
  id: number;
  name: string;
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

const PopularQuestionsBox: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(
    PopularQuestionsCategoryMock[0]?.id || 0
  );
  const { addMessage } = useChat();

  useEffect(() => {
    setActiveTab(PopularQuestionsCategoryMock[0]?.id || 0);
  }, []);

  const clickTab = (categoryId: number) => {
    setActiveTab(categoryId);
  };

  const clickQuestion = (questionId: number, categoryId: number) => {
    const selectedCategory = PopularQuestionsCategoryMock.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      const selectedQuestion = selectedCategory.questions.find(
        (question) => question.id === questionId
      );
      if (selectedQuestion) {
        addMessage({ message: selectedQuestion.name, type: 'USER' });
      }
    }
  };

  return (
    <div className="border-b flex justify-between h-[116px]">
      <div className="whitespace-nowrap w-[160px] flex flex-col place-content-around ">
        {PopularQuestionsCategoryMock.map((category) => (
          <TabCategory
            key={category.id}
            activeTabId={activeTab}
            id={category.id}
            name={category.name}
            clickTab={clickTab}
          />
        ))}
      </div>
      <div className="w-full overflow-y-auto bg-gray-lightest">
        {PopularQuestionsCategoryMock.map((category) => (
          <TabItem key={category.id} id={category.id} activeTabId={activeTab}>
            {category.questions.map((question) => (
              <span
                className="cursor-pointer relative block leading-[16px] align-middle text-xs hover:font-semibold ml-2 my-1 pl-[15px] after:block after:top-1/2 after:left-0 after:translate-y-[-50%] after:absolute after:w-[10px] after:h-[10px] after:bg-green-300"
                key={question.id}
                onClick={() => clickQuestion(question.id, category.id)}
              >
                {question.name}
              </span>
            ))}
          </TabItem>
        ))}
      </div>
    </div>
  );
};

export default PopularQuestionsBox;
