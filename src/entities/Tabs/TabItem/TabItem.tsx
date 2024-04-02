import React from 'react';

interface IAppTabItemProps {
  id: number;
  activeTabId: number;
  children: React.ReactNode;
}

const TabItem: React.FC<IAppTabItemProps> = ({ id, activeTabId, children }) => {
  return (
    <div key={id} className={activeTabId !== id ? 'hidden' : ''}>
      {children}
    </div>
  );
};

export default TabItem;
