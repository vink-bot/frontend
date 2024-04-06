import store from '../index.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../../shared/lib/utils/utils.ts';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IConfig {
  token: string;
  dateCreate: string;
  dateUpdate: string;
  inputFocus: boolean;
  poolingMessage: boolean;
}

const initialState: IConfig = {
  token: uuidv4(),
  dateCreate: getDate().fullDate,
  dateUpdate: getDate().fullDate,
  inputFocus: false,
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
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
  },
});
export const useGetChatConfig = () =>
  useAppSelector((state) => state.chatConfig);
export const useGetChatToken = () =>
  useAppSelector((state) => state.chatConfig.token);
export const { setInputFocus, setPoolingMessage, setToken } =
  chatConfigSlice.actions;
export default chatConfigSlice.reducer;
