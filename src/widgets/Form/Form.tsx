import { FormEvent, useState } from 'react';
import { useChat } from '../../shared/hooks/useChat.ts';
import ButtonSendMessage from '../../features/Button/SendMessage/ButtonSendMessage.tsx';

const Form = () => {
  const [textarea, setTextarea] = useState('');
  const { addMessage } = useChat();

  const handleMessages = () => {
    if (textarea.trim() !== '') {
      addMessage({ message: textarea, type: 'USER' });
      setTextarea('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMessages();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && textarea.trim() !== '') {
      handleMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t">
      <div className="relative flex justify-between items-start px-4 py-2 gap-x-2">
        <textarea
          autoFocus={true}
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full min-h-10  outline-none resize-none"
        />
        <ButtonSendMessage visible={textarea.trim() !== ''} />
      </div>
    </form>
  );
};

export default Form;
