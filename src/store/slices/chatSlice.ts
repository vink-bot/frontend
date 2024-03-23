import { createSlice } from '@reduxjs/toolkit';
import { addDays, getDate } from '../../libs/utils.ts';
import { useSelector } from 'react-redux';

interface iMessage {
  id: number;
  type: 'AI' | 'USER' | 'OPERATOR';
  date: string;
  message: string;
}

interface IChat {
  token: string;
  dateCreate: string;
  dateUpdate: string;
  dateExpire: string;
  messages: [iMessage];
  isFetched: boolean;
  loading: boolean;
  error: string;
}

const initialState: IChat = {
  token: '',
  dateCreate: getDate(),
  dateUpdate: getDate(),
  dateExpire: addDays(getDate(), 10),
  messages: [
    {
      id: 1,
      type: 'AI',
      date: getDate(),
      message: 'Привет, чем я могу помочь',
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
      state.messages.push(payload.message);
    },
  },
  selectors: {
    selectUser: (user) => user, // Выбрать пользователя
  },
});

export const useGetChatMessages = () => useSelector((state: IChat) => state.messages);
export const useGetChatToken = () => useSelector((state: IChat) => state.token);
export const { resetChat, addToken } = chatSlice.actions;
export const reducerChat = chatSlice.reducer;
