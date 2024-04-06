import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDate } from '../../../shared/lib/utils/utils.ts';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import store from '../index.ts';
import MainApi from '../../../shared/api/mainApi.ts';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const sendMessageR = createAsyncThunk(
  'send/sendMessage',
  async (message: string) => {
    const response = await MainApi.sendMessage(message);
    return response.data;
  }
  //MainApi.sendMessage
);

export type MessageType = 'GPT' | 'USER' | 'OPERATOR';

export type MessageStatus = 'SENT' | 'ERROR' | 'SUCCESS';
// enum MessageStatus {
//   PENDING = 'PENDING',
//   SUCCESS = 'SUCCESS',
//   ERROR = 'ERROR',
// }

export interface IDateCreateMessage {
  fullDate: string;
  yearMonthDay: string;
  hoursMinutes: string;
}

export interface IMessageRedux {
  id: string;
  status: MessageStatus;
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
  isLoading: boolean;
  error: string | null;
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
      status: 'SENT',
      type: 'GPT',
      dateCreate: getDate(),
      message: 'Привет, чем я могу помочь?',
    },
  ],
  isFetched: false,
  isLoading: false,
  error: null,
};

//Слайлсы
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChat: () => initialState,
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    addMessage: (state, { payload }) => {
      state.dateUpdate = getDate().fullDate;
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageR.pending.type, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      sendMessageR.fulfilled.type,
      (state, action: PayloadAction<never>) => {
        console.log(action);
        state.isLoading = false;
      }
    );
    builder.addCase(
      sendMessageR.rejected.type,
      (state, action: PayloadAction<never>) => {
        state.isLoading = false;
        state.error = 'Ошибка отправки сообщения на сервер.';
        console.log(state.error);
      }
    );
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
