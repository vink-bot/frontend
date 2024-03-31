import { FormEvent, useState } from 'react';
import { useChat } from '../../shared/lib/hooks/useChat.ts';
import ButtonSendMessage from '../../features/Button/SendMessage/ButtonSendMessage.tsx';
import AppTextArea from '../../shared/ui/AppTextArea/AppTextArea.tsx';

/**
 * Компонент формы для отправки сообщений в чат.
 *
 * @returns JSX элемент формы для отправки сообщений.
 */
const Form: React.FC = () => {
  const [message, setMessage] = useState(''); // Состояние для хранения введенного сообщения
  const { addMessage } = useChat(); // Хук для добавления сообщения в чат

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

  /**
   * Функция для отправки сообщения в чат.
   * Если сообщение не пустое, добавляет его в чат и очищает текстовое поле.
   */
  const sendMessage = () => {
    if (message.trim() !== '') {
      addMessage({ message, type: 'USER' }); // Добавляет сообщение в чат
      setMessage(''); // Очищает текстовое поле
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} className="border-t">
      <div className="relative flex justify-between items-start px-4 py-2 gap-x-2">
        {/* Компонент текстового поля для ввода сообщения */}
        <AppTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Кнопка отправки сообщения */}
        <ButtonSendMessage visible={message.trim() !== ''} />
      </div>
    </form>
  );
};

export default Form;
