import { useState } from 'react';
import { cn } from '../../../shared/lib/utils/utils.ts';
import usePopup from '../../../shared/lib/hooks/usePopup.ts';
import AppButton from '../../../shared/ui/AppButton/AppButton.tsx';

import CloseIcon from '../../../shared/images/icons/close.svg';
import ChatBotIcon from '../../../shared/images/icons/chatbot.svg';

/**
 * Кнопка открытия чата
 *
 * @constructor
 */
const ButtonChatOpen = () => {
  const { isOpen, onOpenPopup, onClosePopup } = usePopup('chatPopup');
  const [isHover, setIsHover] = useState(true);

  const handleClickButton = () => {
    if (isOpen) onClosePopup();
    else onOpenPopup();
  };

  return (
    <AppButton
      size="m"
      classNameButton={cn(
        'fixed bottom-12 right-8 md:opacity-100 md:visible ',
        isOpen && 'opacity-0 invisible'
      )}
      onClick={handleClickButton}
      onMouseEnter={() => setIsHover(false)}
      onMouseLeave={() => setIsHover(true)}
    >
      {isOpen ? (
        <img className="min-w-6 h-6" src={CloseIcon} alt="Close" />
      ) : (
        <>
          {isHover && (
            <span className="absolute motion-safe:animate-ping rounded-full bg-yellow inline-flex h-full w-full opacity-75 duration-3000"></span>
          )}
          <img className="min-w-6 h-6" src={ChatBotIcon} alt="ChatBot" />
        </>
      )}
    </AppButton>
  );
};

export default ButtonChatOpen;
