import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../utils/utils';
import { addMessage, IMessageRedux, MessageType, sendMessageToServer, useGetChatMessages } from '../../../app/store/slices/chatMessagesSlice';
import { setWaitMessageFromServer, useGetChatToken } from '../../../app/store/slices/chatConfigSlice.ts';
import { useAppDispatch } from '../../../app/store/store.hooks.ts';

interface Chat {
  onSetMessageFromServer: (params: { message: string; type: MessageType }) => void;
  isMessages: IMessageRedux[];
  isTokenChat: string;
}

/**
 * Хук для работы с сообщением чата в хранилище Redux
 */
export const useChat = (): Chat => {
  const dispatch = useAppDispatch();
  const messages = useGetChatMessages();
  const tokenChat = useGetChatToken();

  /**
   * Добавление сообщение в хранилище
   *
   * @param message - сообщение
   * @param type - От кого пришло
   */
  const handleAddMessageToRedux = ({ message, type }: { message: string; type: MessageType }) => {
    const localMessage: IMessageRedux = {
      id: uuidv4(),
      type: type,
      status: 'SENT',
      dateCreate: getDate(),
      message: message,
      isFetched: false,
      isLoading: false,
      error: null,
    };

    dispatch(addMessage(localMessage));

    if (type === 'USER') {
      sendToServerMessage(message);
      waitMessage();
    }
  };

  /**
   * Отправка сообщения на сервер
   * @param message
   */
  const sendToServerMessage = (message: string) => {
    dispatch(sendMessageToServer(message));
  };

  /**
   * Ожидание сообщения от сервера
   * Устанавливается в true если сообщение отправил полльзователь
   */
  const waitMessage = () => {
    dispatch(setWaitMessageFromServer({ waitMessageFromServer: true }));
  };

  return {
    onSetMessageFromServer: handleAddMessageToRedux,
    isMessages: messages,
    isTokenChat: tokenChat,
  };
};
