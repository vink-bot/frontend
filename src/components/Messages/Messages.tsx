import { cn } from '../../libs/utils.ts';
import { IMessage, useGetChatMessages } from '../../store/slices/chatSlice.ts';
import { useEffect, useRef, useCallback } from 'react';
import usePopup from '../../hooks/usePopup.ts';

const Messages = () => {
  const messages: IMessage[] = useGetChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isOpen } = usePopup('chatPopup');

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  return (
    <div className="messages flex-1 overflow-y-scroll">
      <div className="p-3 flex flex-col gap-2">
        {messages.map((msg) => {
          const isMyMsg = msg.type === 'USER';
          return (
            <div
              key={msg.id}
              className={cn(
                'rounded-md p-2 text-sm shadow-md w-fit flex',
                isMyMsg && 'bg-blue-light self-end'
              )}
            >
              {msg.message}
            </div>
          );
        })}
        <div id="chatScroll" ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default Messages;
