import { cn } from '../../libs/utils.ts';
import XIcon from '../icons/x-icon.tsx';
import AiChatIcon from '../icons/ai-chat-icon.tsx';
import usePopup from '../../hooks/usePopup.ts';

const ButtonChatOpen = () => {
  const { isOpen, openPopup, closePopup } = usePopup('chatPopup');

  const handleClickButton = () => {
    if (isOpen) closePopup();
    else openPopup();
  };
  return (
    <button
      //onClick={() => setIsOpen(!isOpen)}
      onClick={() => handleClickButton()}
      type="button"
      className={cn(
        'fixed bottom-12 right-8 rounded-full p-6 w-6 h-6 flex items-center justify-center bg-yellow hover:opacity-70 transition-all duration-300 md:opacity-100 md:visible',
        isOpen && 'opacity-0 invisible'
      )}
    >
      {isOpen ? (
        <XIcon className="min-w-3 h-3 object-cover" />
      ) : (
        <AiChatIcon className="min-w-6 h-6 object-cover" />
      )}
    </button>
  );
};

export default ButtonChatOpen;
