import { cn } from '../../../shared/utils/utils.ts';

import usePopup from '../../../shared/hooks/usePopup.ts';
import CloseIcon from '../../../shared/images/icons/close.svg';
import ChatBotIcon from '../../../shared/images/icons/chatbot.svg';

const ButtonChatOpen = () => {
  const { isOpen, openPopup, closePopup } = usePopup('chatPopup');

  const handleClickButton = () => {
    if (isOpen) closePopup();
    else openPopup();
  };

  return (
    <button
      onClick={() => handleClickButton()}
      type="button"
      className={cn(
        'fixed bottom-12 right-8 rounded-full p-6 w-6 h-6 flex items-center justify-center bg-yellow hover:opacity-70 transition-all duration-300 md:opacity-100 md:visible',
        isOpen && 'opacity-0 invisible'
      )}
    >
      {isOpen ? (
        <img className="min-w-6 h-6" src={CloseIcon} alt="close" />
      ) : (
        <img className="min-w-6 h-6" src={ChatBotIcon} alt="ChatBot" />
      )}
    </button>
  );
};

export default ButtonChatOpen;
