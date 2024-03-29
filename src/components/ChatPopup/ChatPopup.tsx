import { cn } from '../../libs/utils.ts';
import usePopup from '../../hooks/usePopup.ts';

type ChatLayoutProps = {
  //isOpen: boolean;
  children: React.ReactNode;
  //setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatPopup = ({ children }: ChatLayoutProps) => {
  const { isOpen } = usePopup('chatPopup');
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

export default ChatPopup;
