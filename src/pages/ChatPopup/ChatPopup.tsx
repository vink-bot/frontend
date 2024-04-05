import { useEffect } from 'react';
import usePopup from '../../shared/lib/hooks/usePopup.ts';
import { cn } from '../../shared/lib/utils/utils.ts';
import WindowTitle from '../../widgets/WindowTitle/WindowTitle.tsx';
import PopularQuestionsBox from '../../widgets/PopularQuestionsBox/PopularQuestionsBox.tsx';
import MessagesBox from '../../widgets/MessagesBox/MessagesBox.tsx';
import Footer from '../../widgets/Footer/Footer.tsx';
import useChatConfig from '../../shared/lib/hooks/useChatConfig.ts';
import { useChat } from '../../shared/lib/hooks/useChat.ts';
import GetMessageService from '../../shared/service/GetMessageService.ts';
import mainApi from '../../shared/api/mainApi.ts';

const ChatPopup = () => {
  const { isOpen } = usePopup('chatPopup');
  const { chatConfig, onSetPoolingMessage } = useChatConfig();
  const { getMessages: messages, onSetMessage, getTokenChat } = useChat();
  const { poolingMessage } = chatConfig;

  //Установка значения токена чата
  mainApi.setChatToken(getTokenChat);

  //Сервис, который будет опрашивать сервер о новых сообщениях
  const messageService = GetMessageService;
  messageService.setHandleMessage(onSetMessage);
  messageService.setHandleStopPooling(onSetPoolingMessage);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (
      (lastMessage.type === 'OPERATOR' || lastMessage.type === 'USER') &&
      poolingMessage
    ) {
      onSetPoolingMessage({ isPooling: true });
      messageService.startPolling();
      messageService.startPollingForData().catch(() => {
        onSetPoolingMessage({ isPooling: false });
      });
    } else {
      // messageService.stopPolling();
      // onSetPoolingMessage({ isPooling: false });
    }
  }, [poolingMessage, messages]);

  return (
    <div
      className={cn(
        'invisible opacity-0 md:max-w-80 w-full min-h-72 h-screen md:max-h-[70dvh] border flex-col rounded-md md:fixed bottom-28 -right-96 bg-white transition-all duration-300',
        isOpen && 'flex visible opacity-100 right-8'
      )}
    >
      <WindowTitle />
      <PopularQuestionsBox />
      <MessagesBox />
      <Footer />
    </div>
  );
};

export default ChatPopup;
