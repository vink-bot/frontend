import usePopup from '../../../shared/hooks/usePopup.ts';
import CloseIcon from '../../../shared/images/icons/close.svg';

const ButtonChatClose = () => {
  const { closePopup: closeChatPopup } = usePopup('chatPopup');
  return (
    <button
      onClick={() => closeChatPopup()}
      type="button"
      className="transition-all duration-300 hover:opacity-50"
    >
      <img className="w-6 h-6" src={CloseIcon} alt="close" />
    </button>
  );
};

export default ButtonChatClose;
