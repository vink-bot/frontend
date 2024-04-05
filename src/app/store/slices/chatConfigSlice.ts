import store from '../index.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IConfig {
  inputFocus: boolean;
  poolingMessage: boolean;
}

const initialState: IConfig = {
  inputFocus: false,
  poolingMessage: false,
};

const chatConfigSlice = createSlice({
  name: 'chatConfig',
  initialState,
  reducers: {
    setInputFocus: (state, { payload }) => {
      state.inputFocus = payload.inputFocus;
    },
    setPoolingMessage: (state, { payload }) => {
      state.poolingMessage = payload.poolingMessage;
    },
  },
});
export const useGetChatConfig = () =>
  useAppSelector((state) => state.chatConfig);

export const { setInputFocus, setPoolingMessage } = chatConfigSlice.actions;
export default chatConfigSlice.reducer;
