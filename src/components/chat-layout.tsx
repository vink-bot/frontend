import { Dispatch, SetStateAction } from 'react';
import XIcon from './x-icon.tsx';
import { cn } from '../libs/utils.ts';
import Avatar from './avatar.tsx';

type ChatLayoutProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ChatLayout = ({ isOpen, setIsOpen }: ChatLayoutProps) => {
  return (
    <div
      className={cn(
        'hidden opacity-0 max-w-80 w-full max-h-72 h-full border bg-gray-dark flex-col rounded-md fixed bottom-28 right-8 bg-white',
        isOpen && 'flex visible opacity-100'
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
    </div>
  );
};

export default ChatLayout;
