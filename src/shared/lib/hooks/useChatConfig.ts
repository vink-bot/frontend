import { setInputFocus, setPoolingMessage, setWaitMessageFromServer, useGetChatConfig } from '../../../app/store/slices/chatConfigSlice';
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

  const handleSetWaitMessageFromServer = ({ waitMessageFromServer }: { waitMessageFromServer: boolean }) => {
    dispatch(setWaitMessageFromServer({ waitMessageFromServer }));
  };

  return {
    chatConfig,
    onSetWaitMessageFromServer: handleSetWaitMessageFromServer,
    onSetFocus: handleChangeFocus,
    onSetPoolingMessage: handlePoolingMessage,
  };
};

export default useChatConfig;
