import { cn } from '../../../libs/utils.ts';
import SendIcon from '../../icons/send-icon.tsx';

interface IButtonSendMessageProps {
  visible: boolean;
}

const ButtonSendMessage = ({ visible }: IButtonSendMessageProps) => {
  return (
    <button
      type="submit"
      className={cn(
        'bg-yellow rounded-full flex self-center hover:opacity-70 transition-all duration-300 invisible opacity-0 scale-0',
        visible && 'visible opacity-100 scale-100'
      )}
    >
      <SendIcon className="w-10 h-10 object-cover p-2" />
    </button>
  );
};

export default ButtonSendMessage;
