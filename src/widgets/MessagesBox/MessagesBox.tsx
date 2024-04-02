import { useEffect, useRef, useCallback } from 'react';
import {
  IMessage,
  useGetChatMessages,
} from '../../app/store/slices/chatSlice.ts';
import usePopup from '../../shared/lib/hooks/usePopup.ts';
import AppMessage from '../../shared/ui/AppMessage/AppMessage.tsx';

const MessagesBox = () => {
  const messages: IMessage[] = useGetChatMessages();
  const { isOpen } = usePopup('chatPopup');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, scrollToBottom]);

  return (
    <div className="messages flex-1 overflow-y-scroll bg-gray-50">
      <div className="p-3 flex flex-col gap-2">
        {messages.map((msg: IMessage) => (
          <AppMessage key={msg.id} message={msg} />
        ))}
        <div id="chatScroll" ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default MessagesBox;
