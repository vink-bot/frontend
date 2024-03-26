import { FormEvent, useState } from 'react';
import SendIcon from '../icons/send-icon.tsx';
import { cn } from '../../libs/utils.ts';
import { useChat } from '../../hooks/useChat.ts';

const Form = () => {
  const [textarea, setTextarea] = useState('');
  const { handleAddMessage } = useChat();

  const handleMessages = () => {
    handleAddMessage({ message: textarea, type: 'USER' });
    setTextarea('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMessages();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t">
      <div className="relative flex justify-between items-start">
        <textarea
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full min-h-28 px-4 py-2 outline-none resize-none"
        />

        <button
          type="submit"
          className={cn(
            'mt-2 mr-2 bg-yellow rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300 invisible opacity-0 scale-0',
            textarea !== '' && 'visible opacity-100 scale-100'
          )}
        >
          <SendIcon className="w-10 h-10 object-cover p-2" />
        </button>
      </div>
    </form>
  );
};

export default Form;
