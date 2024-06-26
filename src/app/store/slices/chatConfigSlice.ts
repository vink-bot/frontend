import { useAppSelector } from '../store.hooks.ts';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../../shared/lib/utils/utils';


interface IConfig {
  token: string;
  dateCreate: string;
  dateUpdate: string;
  inputFocus: boolean;
  toggleMenu: boolean;
  waitMessageFromServer: boolean;
  poolingMessage: boolean;
}

const initialState: IConfig = {
  token: uuidv4(),
  dateCreate: getDate().fullDate,
  dateUpdate: getDate().fullDate,
  inputFocus: false,
  toggleMenu: false,
  waitMessageFromServer: false,
  poolingMessage: false,
};

const chatConfigSlice = createSlice({
  name: 'chatConfig',
  initialState,
  reducers: {
    resetChat: () => initialState,
    setInputFocus: (state, { payload }) => {
      state.inputFocus = payload.inputFocus;
    },
    setPoolingMessage: (state, { payload }) => {
      state.poolingMessage = payload.poolingMessage;
    },
    setWaitMessageFromServer: (state, { payload }) => {
      state.waitMessageFromServer = payload.waitMessageFromServer;
    },
    setToggle: (state, { payload }) => {
      state.token = payload.toggleMenu;
    },
  },
});
export const useGetChatConfig = () => useAppSelector((state) => state.chatConfig);
export const useGetChatToken = () => useAppSelector((state) => state.chatConfig.token);
export const { setInputFocus, setPoolingMessage, setWaitMessageFromServer, setToggle } = chatConfigSlice.actions;
export default chatConfigSlice.reducer;
