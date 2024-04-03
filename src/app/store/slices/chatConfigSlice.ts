import store from '../index.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IConfig {
  inputFocus: boolean;
}

const initialState: IConfig = {
  inputFocus: false,
};

const chatConfigSlice = createSlice({
  name: 'chatConfig',
  initialState,
  reducers: {
    setConfig: (state, { payload }) => {
      state.inputFocus = payload.inputFocus;
    },
  },
});
export const useGetChatConfig = () =>
  useAppSelector((state) => state.chatConfig);

export const { setConfig } = chatConfigSlice.actions;
export default chatConfigSlice.reducer;
