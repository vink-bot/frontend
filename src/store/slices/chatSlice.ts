import { createSlice } from '@reduxjs/toolkit';
import { addDays, getDate } from '../../libs/utils';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../index.ts';
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type MessageType = 'AI' | 'USER' | 'OPERATOR';

export interface IMessage {
  id: string;
  type: MessageType | string;
  date: string;
  message: string;
}

export interface IChat {
  token: string;
  dateCreate: string;
  dateUpdate: string;
  dateExpire: string;
  messages: IMessage[];
  isFetched: boolean;
  loading: boolean;
  error: string;
}

const initialState: IChat = {
  token: uuidv4(),
  dateCreate: getDate(),
  dateUpdate: getDate(),
  dateExpire: addDays(getDate(), 10),
  messages: [
    {
      id: '',
      type: '',
      date: '',
      message: '',
    },
  ],
  isFetched: false,
  loading: false,
  error: '',
};

//Слайлсы
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChat: () => initialState, // Возвращаем начальное состояние
    addToken: (state, { payload }) => {
      state.token = payload.token;
    },
    addMessage: (state, { payload }) => {
      state.dateUpdate = getDate();
      state.dateExpire = addDays(state.dateUpdate, 10);
      state.messages.push(payload);
    },
  },
});
//Экспорт селекторов
export const useGetChatMessages = () => useAppSelector((state) => state.chat.messages);
export const useGetChatToken = () => useSelector((state: IChat) => state.token);
// Экспорт действий
export const { resetChat, addToken, addMessage } = chatSlice.actions;
// Экспорт редьюсера
export const reducerChat = chatSlice.reducer;
