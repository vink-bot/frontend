import {
  setConfig,
  useGetChatConfig,
} from '../../../app/store/slices/chatConfigSlice.ts';
import { useAppDispatch } from '../../../app/store';

const useChatConfig = () => {
  const dispatch = useAppDispatch();
  const chatConfig = useGetChatConfig();

  const handleChangeFocus = (isFocus: boolean) => {
    dispatch(setConfig({ inputFocus: isFocus }));
  };

  const handlePoolingMessage = ({ isPooling }: { isPooling: boolean }) => {
    dispatch(setConfig({ poolingMessage: isPooling }));
  };

  return {
    chatConfig,
    onSetFocus: handleChangeFocus,
    onSetPoolingMessage: handlePoolingMessage,
  };
};

export default useChatConfig;
