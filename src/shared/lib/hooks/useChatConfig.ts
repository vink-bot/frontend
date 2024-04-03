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
  return {
    chatConfig,
    changeFocus: handleChangeFocus,
  };
};

export default useChatConfig;
