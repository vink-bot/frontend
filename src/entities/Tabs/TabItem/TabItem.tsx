import React from 'react';

interface IAppTabItemProps {
  id: number;
  activeTabId: number;
  children: React.ReactNode;
}

/**
 * Компонент отображает содержимое вкладки категории.
 * @param id Идентификатор вкладки.
 * @param activeTabId Идентификатор текущей активной вкладки.
 * @param children Дочерние элементы компонента.
 */
const MemoizedTabItem: React.FC<IAppTabItemProps> = ({ id, activeTabId, children }) => {
  return (
    <div key={id} className={activeTabId !== id ? 'hidden' : ''}>
      {children}
    </div>
  );
};

const TabItem = React.memo(MemoizedTabItem);
export default TabItem;
