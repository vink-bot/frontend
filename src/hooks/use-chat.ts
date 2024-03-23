import { useAppDispatch } from '../store';
import { addMessage, IMessage } from '../store/slices/chatSlice.ts';

export const useChat = () => {
  const dispatch = useAppDispatch();

  const handleAddMessage = (message: IMessage) => {
    dispatch(addMessage(message));
  };

  return {
    handleAddMessage,
  };
};
