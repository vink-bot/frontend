import { FC, useEffect, useState } from 'react';
import { useChat } from '../../shared/lib/hooks/useChat';
import { TabCategory, TabItem } from '../../entities/Tabs';
import AppQuestionLink from '../../shared/ui/AppQuestionLink/AppQuestionLink';
import { cn } from '../../shared/lib/utils/utils';
import { PopularQuestionsCategoryMock } from './mock';
import useChatConfig from '../../shared/lib/hooks/useChatConfig';
import ButtonPopularQuestionsToggle from '../../features/Buttons/PopularQuestionsToggle/ButtonPopularQuestionsToggle';

/**
 * Блок с популярными вопросами пользователей
 *
 * @constructor
 */
const PopularQuestionsBox: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(PopularQuestionsCategoryMock[0]?.id || 0);
  const { onSetMessageFromServer } = useChat();
  const { chatConfig, onSetPoolingMessage } = useChatConfig();
  const { inputFocus } = chatConfig;

  // Устанавливаем активную вкладку при монтировании компонента
  useEffect(() => {
    setActiveTab(PopularQuestionsCategoryMock[0]?.id || 0);
  }, []);

  // Обработчик клика по вкладке категории
  const clickTab = (categoryId: number) => {
    setActiveTab(categoryId);
  };

  // Обработчик клика по вопросу
  const clickQuestion = (questionId: number, categoryId: number) => {
    const selectedCategory = PopularQuestionsCategoryMock.find((category) => category.id === categoryId);
    if (selectedCategory) {
      const selectedQuestion = selectedCategory.questions.find((question) => question.id === questionId);
      if (selectedQuestion) {
        onSetMessageFromServer({ message: selectedQuestion.name, type: 'USER' });
        onSetPoolingMessage({ isPooling: true });
      }
    }
  };

  return (
    <div className={cn('border-b max-h-28 h-full overflow-y-hidden animate-heightFadeIn', inputFocus && 'animate-heightFadeOut invisible')}>
      {inputFocus && <ButtonPopularQuestionsToggle />}

      <div className={'flex justify-between h-full'}>
        <div className="flex h-full flex-col whitespace-nowrap w-[160px]">
          {PopularQuestionsCategoryMock.map((category) => (
            <TabCategory key={category.id} activeTabId={activeTab} id={category.id} name={category.name} clickTab={clickTab} />
          ))}
        </div>
        <div className="w-full overflow-y-auto bg-gray-lightest">
          {PopularQuestionsCategoryMock.map((category) => (
            <TabItem key={category.id} id={category.id} activeTabId={activeTab}>
              {category.questions.map((question) => (
                <AppQuestionLink key={question.id} questionId={question.id} clickQuestion={clickQuestion} questionName={question.name} categoryId={category.id} />
              ))}
            </TabItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularQuestionsBox;
