import { cn } from '../../../shared/lib/utils/utils.ts';
import SendIcon from '../../../shared/images/icons/send.svg';
import AppButton from '../../../shared/ui/AppButton/AppButton.tsx';

interface IButtonSendMessageProps {
  visible: boolean;
}

/**
 * Кнопка отправления сообщений в чат
 * @param visible
 * @constructor
 */
const ButtonSendMessage = ({ visible }: IButtonSendMessageProps) => {
  return (
    <AppButton
      type="submit"
      buttonClassName={cn(
        'invisible opacity-0 scale-0',
        visible && 'visible opacity-100 scale-100'
      )}
    >
      <img className="w-10 h-10 p-2" src={SendIcon} alt="Send" />
    </AppButton>
  );
};

export default ButtonSendMessage;
