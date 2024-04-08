import { FC, ReactNode } from 'react';
import { cn } from '../../shared/lib/utils/utils.ts';

interface IChatLayoutProps {
  children: ReactNode;
  isOpen: boolean;
}

const ChatLayout: FC<IChatLayoutProps> = ({ children, isOpen }) => {
  return (
    <div
      className={cn(
        'invisible opacity-0 md:max-w-80 w-full min-h-72 h-screen md:max-h-[70dvh] border flex-col rounded-md md:fixed bottom-28 -right-96 bg-white transition-all duration-300',
        isOpen && 'flex visible opacity-100 right-8'
      )}
    >
      {children}
    </div>
  );
};

export default ChatLayout;
