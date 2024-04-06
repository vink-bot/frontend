import { cn } from '../../../shared/lib/utils/utils';
import usePopup from '../../../shared/lib/hooks/usePopup';
import AppButton from '../../../shared/ui/AppButton/AppButton';
import PulsatingCircle from '../../../shared/ui/PulsatingCircle/PulsatingCircle';

import CloseIcon from '../../../shared/images/icons/close.svg';
import ChatBotIcon from '../../../shared/images/icons/chatbot.svg';

/**
 * Кнопка открытия чата
 *
 * @constructor
 */
const ButtonChatOpen = () => {
  const { isOpen, onOpenPopup, onClosePopup } = usePopup('chatPopup');

  const handleClickButton = () => {
    if (isOpen) onClosePopup();
    else onOpenPopup();
  };

  return (
    <AppButton size="m" classNameButton={cn('fixed bottom-12 right-8 md:opacity-100 md:visible ', isOpen && 'opacity-0 invisible')} onClick={handleClickButton}>
      {isOpen ? (
        <img className="min-w-6 h-6" src={CloseIcon} alt="Close" />
      ) : (
        <>
          <PulsatingCircle />
          <img className="min-w-6 h-6" src={ChatBotIcon} alt="ChatBot" />
        </>
      )}
    </AppButton>
  );
};

export default ButtonChatOpen;
