import { cn } from '../../../shared/utils/utils.ts';
import SendIcon from '../../../shared/images/icons/send.svg';

interface IButtonSendMessageProps {
  visible: boolean;
}

const ButtonSendMessage = ({ visible }: IButtonSendMessageProps) => {
  return (
    <button
      type="submit"
      className={cn(
        'shrink-0 w-[40px] h-[40px] bg-yellow rounded-full flex self-center hover:opacity-70 transition-all duration-300 invisible opacity-0 scale-0',
        visible && 'visible opacity-100 scale-100'
      )}
    >
      <img className="w-10 h-10 p-2" src={SendIcon} alt="Send" />
    </button>
  );
};

export default ButtonSendMessage;
