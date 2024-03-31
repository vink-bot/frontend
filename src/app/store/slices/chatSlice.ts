import { createSlice } from '@reduxjs/toolkit';
import { addDays, getDate } from '../../../shared/lib/utils/utils.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../index.ts';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type MessageType = 'AI' | 'USER' | 'OPERATOR';

export interface IMessage {
  id: string;
  type: MessageType | string;
  date: {
    fullDate: string;
    yearMonthDay: string;
    hoursMinutes: string;
  };
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
  dateCreate: getDate().fullDate,
  dateUpdate: getDate().fullDate,
  dateExpire: addDays(getDate().fullDate, 10).fullDate,
  messages: [
    {
      id: uuidv4(),
      type: 'AI',
      date: getDate(),
      message: 'Привет, чем я могу помочь?',
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
      state.dateUpdate = getDate().fullDate;
      state.dateExpire = addDays(state.dateUpdate, 10).fullDate;
      state.messages.push(payload);
    },
  },
});
//Экспорт селекторов
export const useGetChatMessages = () =>
  useAppSelector((state) => state.chat.messages);
export const useGetChatToken = () => useSelector((state: IChat) => state.token);
// Экспорт действий
export const { resetChat, addToken, addMessage } = chatSlice.actions;
// Экспорт редьюсера
export const reducerChat = chatSlice.reducer;
