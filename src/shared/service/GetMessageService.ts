import mainApi from '../api/mainApi.ts';
import { AxiosResponse } from 'axios';
import { MessageType } from '../../app/store/slices/chatMessagesSlice.ts';

// Тип обработчика сообщений
interface MessageHandler {
  (messageData: { message: string; type: MessageType }): void;
}

// Тип обработчика остановки пуллинга
interface StopPoolingHandler {
  (stopPoolingData: { isPooling: boolean }): void;
}

class GetMessageService {
  private pollingInterval: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;
  private handleMessage: MessageHandler = () => {};
  private handleStopPooling: StopPoolingHandler = () => {};

  setHandleMessage = (handleMessage: MessageHandler): void => {
    this.handleMessage = handleMessage;
  };

  setHandleStopPooling = (handleStopPooling: StopPoolingHandler): void => {
    this.handleStopPooling = handleStopPooling;
  };

  startPollingForData = (): void => {
    console.log('Init Pooling');
    if (this.isPolling) {
      console.log('Start Pooling');
      this.pollingInterval = setInterval(async () => {
        try {
          const response: AxiosResponse = await mainApi.getMessage();
          const { messages } = response.data;
          console.log(response.data);
          if (messages.length > 0) {
            messages?.map(
              (message: {
                message: string;
                date_create: string;
                user: MessageType;
              }) => {
                this.handleMessage({
                  message: message.message,
                  type: message.user,
                });
              }
            );
            const lastMessage = messages[messages.length - 1];
            if (
              lastMessage.type !== 'OPERATOR' ||
              lastMessage.type !== 'USER'
            ) {
              this.stopPolling();
            }
          }
        } catch (error) {
          console.error('Произошла ошибка при получении данных SetInterval');
        }
      }, 3000);
    }
  };

  stopPolling = (): void => {
    console.log('Stop Pooling');
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.isPolling = false;
      this.handleStopPooling({ isPooling: false });
    }
  };

  startPolling = (): void => {
    this.isPolling = true;
  };
}

const getMessageService = new GetMessageService();

export default getMessageService;
