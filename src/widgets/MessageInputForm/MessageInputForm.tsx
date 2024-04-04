import React, { FormEvent, FocusEvent, useState } from 'react';
import { useChat } from '../../shared/lib/hooks/useChat.ts';
import AppTextArea from '../../shared/ui/AppTextArea/AppTextArea.tsx';
import ButtonSendMessage from '../../features/Buttons/SendMessage/ButtonSendMessage.tsx';
import useChatConfig from '../../shared/lib/hooks/useChatConfig.ts';

/**
 * Компонент формы для отправки сообщений в чат.
 *
 * @returns JSX элемент формы для отправки сообщений.
 */
const MessageInputForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage } = useChat();
  const { changeFocus } = useChatConfig();

  /**
   * Функция для отправки сообщения в чат.
   * Если сообщение не пустое, добавляет его в чат и очищает текстовое поле.
   */
  const sendMessage = () => {
    if (message.trim() !== '') {
      addMessage({ message, type: 'USER' });
      setMessage('');
    }
  };

  /**
   * Обработчик события отправки формы.
   * Вызывает функцию для отправки сообщения в чат.
   *
   * @param e - Событие отправки формы.
   */
  const handleMessageSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  /**
   * Обработчик события нажатия клавиши в текстовом поле.
   * Если нажата клавиша Enter и текстовое поле не пустое, вызывает функцию для отправки сообщения.
   *
   * @param e - Событие нажатия клавиши.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim() !== '') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFocus = (e: FocusEvent) => {
    e.preventDefault();
    changeFocus(true);
  };

  return (
    <form
      onSubmit={handleMessageSubmit}
      className="border-t relative flex justify-between items-center px-4 py-2 gap-x-2"
    >
      <AppTextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      <ButtonSendMessage visible={message.trim() !== ''} />
    </form>
  );
};

export default MessageInputForm;
