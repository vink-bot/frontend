import React, { FocusEvent, FormEvent, useState } from 'react';
import { useChat } from '../../shared/lib/hooks/useChat';
import AppTextArea from '../../shared/ui/AppTextArea/AppTextArea';
import ButtonSendMessage from '../../features/Buttons/SendMessage/ButtonSendMessage';
import useChatConfig from '../../shared/lib/hooks/useChatConfig';
import { cn } from '../../shared/lib/utils/utils';

/**
 * Компонент формы для отправки сообщений в чат.
 *
 * @returns JSX элемент формы для отправки сообщений.
 */
const MessageInputForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const { onSetMessage } = useChat();
  const { onSetFocus, onSetPoolingMessage, chatConfig } = useChatConfig();

  /**
   * Функция для отправки сообщения в чат.
   * Если сообщение не пустое, добавляет его в чат и очищает текстовое поле.
   */
  const sendMessage = () => {
    if (message.trim() !== '') {
      onSetMessage({ message, type: 'USER' });
      onSetPoolingMessage({ isPooling: true });
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
    onSetFocus(true);
  };

  return (
    <form onSubmit={handleMessageSubmit} className={cn('relative flex items-center justify-between gap-x-2 border-t px-4 py-2', chatConfig.inputFocus && 'h-32 ')}>
      <AppTextArea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} onFocus={handleFocus} />
      <ButtonSendMessage visible={message.trim() !== ''} />
    </form>
  );
};

export default MessageInputForm;
