import { useAppDispatch } from '../store';
import { addMessage, IMessage, MessageType } from '../store/slices/chatSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../libs/utils.ts';

interface Chat {
  addMessage: (params: { message: string; type: MessageType }) => void;
}

export const useChat = (): Chat => {
  const dispatch = useAppDispatch();

  const handleAddMessage = ({ message, type }: { message: string; type: MessageType }) => {
    const localMessage: IMessage = {
      id: uuidv4(),
      type: type, // Указываю здесь статический тип, но вы можете передавать динамический тип при вызове функции
      date: getDate(),
      message: message,
    };
    dispatch(addMessage(localMessage));
  };

  return {
    addMessage: handleAddMessage,
  };
};
