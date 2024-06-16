import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDate } from '../../../shared/lib/utils/utils';
import { v4 as uuidv4 } from 'uuid';
import MainApi from '../../../shared/api/mainApi';
import { useAppSelector } from '../store.hooks.ts';



export const sendMessageToServer = createAsyncThunk('send/sendMessage', async (message: string) => {
  const response = await MainApi.sendMessage(message);
  return response.data;
});

export type MessageType = 'GPT' | 'USER' | 'OPERATOR' | 'ERROR';

export type MessageStatus = 'SENT' | 'ERROR' | 'SUCCESS' | 'RECEIVE';

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
  isFetched: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Начальное состояние
 */
const initialState: IMessageRedux[] = [
  {
    id: uuidv4(),
    status: 'SENT',
    type: 'GPT',
    dateCreate: getDate(),
    message: 'Привет, чем я могу помочь?',
    isFetched: false,
    isLoading: false,
    error: null,
  },
];

const chatMessagesSlice = createSlice({
  name: 'chatMessage',
  initialState,
  reducers: {
    resetMessageChat: () => initialState,
    addMessage: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageToServer.pending.type, () => {
    });
    builder.addCase(sendMessageToServer.fulfilled.type, () => {
    });
    builder.addCase(sendMessageToServer.rejected.type, () => {
    });
  },
});
//Экспорт селекторов
export const useGetChatMessages = () => useAppSelector((state) => state.chatMessages);
// Экспорт действий
export const { addMessage } = chatMessagesSlice.actions;
// Экспорт редьюсера
export default chatMessagesSlice.reducer;
