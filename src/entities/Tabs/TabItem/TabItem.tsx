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
const TabItem: React.FC<IAppTabItemProps> = ({ id, activeTabId, children }) => {
  return (
    <div key={id} className={activeTabId !== id ? 'hidden' : ''}>
      {children}
    </div>
  );
};

export default TabItem;
