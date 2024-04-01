import { useAppDispatch } from '../../../app/store';
import {
  addMessage,
  IMessage,
  MessageType,
} from '../../../app/store/slices/chatSlice.ts';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../utils/utils.ts';

interface Chat {
  addMessage: (params: { message: string; type: MessageType }) => void;
}

export const useChat = (): Chat => {
  const dispatch = useAppDispatch();

  const handleAddMessage = ({
    message,
    type,
  }: {
    message: string;
    type: MessageType;
  }) => {
    const localMessage: IMessage = {
      id: uuidv4(),
      type: type,
      date: getDate(),
      message: message,
    };
    dispatch(addMessage(localMessage));
  };

  return {
    addMessage: handleAddMessage,
  };
};
