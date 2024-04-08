import { useEffect } from 'react';
import useChatConfig from '../../../shared/lib/hooks/useChatConfig';
import { useChat } from './useChat';
import GetMessageService from '../../../app/service/GetMessageService';
import mainApi from '../../../shared/api/mainApi';

const useChatPopupLogic = () => {
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
    //const lastMessage = messages[messages.length - 1];
    console.log('poolingMessage ', poolingMessage);
    if (poolingMessage) {
      // onSetPoolingMessage({ isPooling: true });
      messageService.startPolling();
      messageService.startPollingForData();
    }
  }, [poolingMessage, messages]);
};

export default useChatPopupLogic;
