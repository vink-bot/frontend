import { useEffect, useRef, useCallback } from 'react';
import usePopup from '../../shared/lib/hooks/usePopup.ts';
import AppMessage from '../../shared/ui/AppMessage/AppMessage.tsx';
import { useChat } from '../../shared/lib/hooks/useChat.ts';
import { IMessageRedux } from '../../app/store/slices/chatMessagesSlice.ts';
/*import useChatConfig from '../../shared/lib/hooks/useChatConfig';*/

const MessagesBox = () => {
  const { getMessages: messages } = useChat();
  // const { chatConfig, onSetPoolingMessage } = useChatConfig();
  const { isOpen } = usePopup('chatPopup');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const { poolingMessage } = chatConfig;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, scrollToBottom]);

  // useEffect(() => {
  //   const lastMessage = messages[messages.length - 1];
  //   if (lastMessage.type === 'OPERATOR' || lastMessage.type === 'USER') {
  //     onSetPoolingMessage(true);
  //   } else {
  //     onSetPoolingMessage(false);
  //   }
  // }, [poolingMessage, messages]);

  return (
    <div className="messages flex-1 overflow-y-scroll bg-gray-50">
      <div className="p-3 flex flex-col gap-2">
        {messages.map((msg: IMessageRedux) => (
          <AppMessage key={msg.id} message={msg} />
        ))}
        <div id="chatScroll" ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default MessagesBox;
