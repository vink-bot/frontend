import { createSlice } from '@reduxjs/toolkit';
import { getDate } from '../../../shared/lib/utils/utils.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../index.ts';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type MessageType = 'GPT' | 'USER' | 'OPERATOR';

export interface IDateCreateMessage {
  fullDate: string;
  yearMonthDay: string;
  hoursMinutes: string;
}

export interface IMessageRedux {
  id: string;
  type: MessageType;
  dateCreate: IDateCreateMessage;
  message: string;
}

export interface IChat {
  token: string;
  dateCreate: string;
  dateUpdate: string;
  messages: IMessageRedux[];
  isFetched: boolean;
  loading: boolean;
  error: string;
}

/**
 * Начальное состояние
 */
const initialState: IChat = {
  token: uuidv4(),
  dateCreate: getDate().fullDate,
  dateUpdate: getDate().fullDate,
  messages: [
    {
      id: uuidv4(),
      type: 'GPT',
      dateCreate: getDate(),
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
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },

    addMessage: (state, { payload }) => {
      state.dateUpdate = getDate().fullDate;
      state.messages.push(payload);
    },
  },
});
//Экспорт селекторов
export const useGetChatMessages = () =>
  useAppSelector((state) => state.chat.messages);
export const useGetChatToken = () =>
  useAppSelector((state) => state.chat.token);
// Экспорт действий
export const { resetChat, setToken, addMessage } = chatSlice.actions;
// Экспорт редьюсера
export default chatSlice.reducer;
