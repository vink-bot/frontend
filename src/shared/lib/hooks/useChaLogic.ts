import { useEffect } from 'react';
import useChatConfig from '../../../shared/lib/hooks/useChatConfig';
import { useChat } from './useChat';
import GetMessageService from '../../../app/service/GetMessageService';
import mainApi from '../../../shared/api/mainApi';

const useChatPopupLogic = () => {
  const { chatConfig, onSetPoolingMessage, onSetWaitMessageFromServer } = useChatConfig();
  const { onSetMessageFromServer, isTokenChat } = useChat();
  const { poolingMessage } = chatConfig;

  //Установка значения токена чата
  mainApi.setChatToken(isTokenChat);

  //Сервис, который будет опрашивать сервер о новых сообщениях
  const messageService = GetMessageService;
  messageService.setHandleMessage(onSetMessageFromServer);
  messageService.setHandleStopPooling(onSetPoolingMessage);
  messageService.setHandleMessageWaitFromServer(onSetWaitMessageFromServer);

  useEffect(() => {
    if (poolingMessage) {
      messageService.startPolling();
      messageService.startPollingForData();
    }
  }, [poolingMessage]);
};

export default useChatPopupLogic;
