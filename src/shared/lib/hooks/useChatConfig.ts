import {
  setInputFocus,
  setPoolingMessage,
  useGetChatConfig,
} from '../../../app/store/slices/chatConfigSlice.ts';
import { useAppDispatch } from '../../../app/store';

const useChatConfig = () => {
  const dispatch = useAppDispatch();
  const chatConfig = useGetChatConfig();

  const handleChangeFocus = (isFocus: boolean) => {
    dispatch(setInputFocus({ inputFocus: isFocus }));
  };

  const handlePoolingMessage = ({ isPooling }: { isPooling: boolean }) => {
    dispatch(setPoolingMessage({ poolingMessage: isPooling }));
  };

  return {
    chatConfig,
    onSetFocus: handleChangeFocus,
    onSetPoolingMessage: handlePoolingMessage,
  };
};

export default useChatConfig;
