import { Dispatch, SetStateAction } from 'react';
import XIcon from './icons/x-icon.tsx';
import { cn } from '../libs/utils.ts';
import Avatar from './avatar.tsx';
import PopularQuestionsBox from './PopularQuestionsBox/PopularQuestionsBox.tsx';
import Form from './form.tsx';
import Messages from './messages.tsx';
import { MessagesProvider } from '../context/messages-context.tsx';

type ChatLayoutProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatLayout = ({ isOpen, setIsOpen }: ChatLayoutProps) => {
  return (
    <div
      className={cn(
        'invisible opacity-0 md:max-w-80 w-full min-h-72 h-screen md:max-h-[70dvh] border flex-col rounded-md md:fixed bottom-28 -right-96 bg-white transition-all duration-300',
        isOpen && 'flex visible opacity-100 right-8'
      )}
    >
      <div className="header flex items-center justify-between bg-yellow px-3 py-2">
        <Avatar />

        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="transition-all duration-300 hover:opacity-50"
        >
          <XIcon className="w-3 h-3 object-cover" />
        </button>
      </div>
      <PopularQuestionsBox />
      <MessagesProvider>
        <div className="messages flex-1 overflow-y-scroll">
          <Messages />
        </div>

        <div className="footer">
          <Form />
        </div>
      </MessagesProvider>
    </div>
  );
};

export default ChatLayout;
