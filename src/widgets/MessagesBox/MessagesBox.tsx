import { useCallback, useEffect, useRef } from 'react';
import usePopup from '../../shared/lib/hooks/usePopup';
import AppMessage from '../../shared/ui/AppMessage/AppMessage';
import { useChat } from '../../shared/lib/hooks/useChat';
import { IMessageRedux } from '../../app/store/slices/chatMessagesSlice';
import dotImage from '../../shared/images/icons/dot.svg';
import useChatConfig from '../../shared/lib/hooks/useChatConfig.ts';

const MessagesBox = () => {
  const { isMessages: messages } = useChat();
  const { chatConfig } = useChatConfig();
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
    <div className="flex-1 overflow-y-scroll bg-gray-50 messages">
      <div className="flex flex-col gap-2 p-3">
        {messages.map((msg: IMessageRedux) => (
          <AppMessage key={msg.id} message={msg} />
        ))}
        <div id="chatScroll" ref={messagesEndRef}></div>
        {chatConfig.waitMessageFromServer && (
          <span className="w-full flex justify-end ">
            <img className="h-8 w-8 " src={dotImage} alt="dot" />
          </span>
        )}
      </div>
    </div>
  );
};

export default MessagesBox;
