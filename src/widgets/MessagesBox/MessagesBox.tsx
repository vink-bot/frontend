import { useEffect, useRef, useCallback } from 'react';
import {
  IMessage,
  useGetChatMessages,
} from '../../app/store/slices/chatSlice.ts';
import { cn } from '../../shared/utils/utils.ts';
import usePopup from '../../shared/hooks/usePopup.ts';

const MessagesBox = () => {
  const messages: IMessage[] = useGetChatMessages();
  const { isOpen } = usePopup('chatPopup');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCurrentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  return (
    <div className="messages flex-1 overflow-y-scroll bg-gray-50">
      <div className="p-3 flex flex-col gap-2">
        {messages.map((msg: IMessage) => {
          const isMyMsg = msg.type === 'USER';
          return (
            <div
              ref={messageCurrentRef}
              // onMouseEnter={(event) => {
              //   console.log(event);
              // }}
              // onMouseOut={(event) => {
              //   console.log(event);
              // }}
              key={msg.id}
              className={cn(
                'flex gap-2 items-center w-full',
                'justify-end',
                !isMyMsg && 'flex-row-reverse'
              )}
            >
              <div>
                <time className="text-xs" dateTime={msg.date.fullDate}>
                  {msg.date.hoursMinutes}
                </time>
              </div>
              <div
                className={cn(
                  'break-anywhere rounded-md p-2 text-sm shadow-md bg-white',
                  isMyMsg && 'bg-yellow'
                )}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
        <div id="chatScroll" ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default MessagesBox;
