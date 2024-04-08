import usePopup from '../../../shared/lib/hooks/usePopup';
import AppButton from '../../../shared/ui/AppButton/AppButton';

import CloseIcon from '../../../shared/images/icons/close.svg';

/**
 * Кнопка закрытия чата
 *
 * @constructor
 */
const ButtonChatClose = () => {
  const { onClosePopup: closeChatPopup } = usePopup('chatPopup');
  return (
    <AppButton border="border-none" type="button" color="transparent" onClick={closeChatPopup}>
      <img className="w-6 h-6" src={CloseIcon} alt="close" />
    </AppButton>
  );
};

export default ButtonChatClose;
