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
    setConfig: (_state, { payload }) => {
      return payload;
    },
  },
});
export const useGetChatConfig = () =>
  useAppSelector((state) => state.chatConfig);

export const { setConfig } = chatConfigSlice.actions;
export default chatConfigSlice.reducer;
