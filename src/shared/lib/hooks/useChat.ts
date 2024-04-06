import { useAppDispatch } from '../../../app/store';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../utils/utils.ts';
import { addMessage, IMessageRedux, MessageType, useGetChatMessages } from '../../../app/store/slices/chatMessagesSlice.ts';
import { useGetChatToken } from '../../../app/store/slices/chatConfigSlice.ts';

interface Chat {
  onSetMessage: (params: { message: string; type: MessageType }) => void;
  getMessages: IMessageRedux[];
  getTokenChat: string;
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
  };

  return {
    onSetMessage: handleAddMessageToRedux,
    getMessages: messages,
    getTokenChat: tokenChat,
  };
};
