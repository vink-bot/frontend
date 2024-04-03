import ChevronRightIcon from '../../../shared/images/icons/chevron-right.svg';
import React from 'react';

interface IAppTabCategoryProps {
  id: number;
  name: string;
  activeTabId: number;
  clickTab: (id: number) => void;
}

/**
 * Компонент отображает вкладку категории в панели вопросов.
 * @param id Идентификатор категории.
 * @param name Название категории.
 * @param activeTabId Идентификатор текущей активной вкладки.
 * @param clickTab Функция обработки клика по вкладке категории.
 */
const TabCategory: React.FC<IAppTabCategoryProps> = ({
  id,
  name,
  activeTabId,
  clickTab,
}) => {
  return (
    <span
      key={id}
      className={`pl-2 leading-1 h-full border-r cursor-pointer flex columns items-center justify-between whitespace-nowrap hover:font-semibold ${
        activeTabId === id
          ? 'font-semibold border-r-0 border-t border-b first:border-b first:border-t-0 last:border-b-0 bg-gray-lightest'
          : ''
      }`}
      onClick={() => clickTab(id)}
    >
      {name}
      {activeTabId === id && (
        <img
          className="w-[15px] h-[15px] text-#be3041"
          src={ChevronRightIcon}
          alt="Chevron Right"
        />
      )}
    </span>
  );
};

export default TabCategory;
