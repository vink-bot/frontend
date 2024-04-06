import mainApi from '../../shared/api/mainApi.ts';
import { AxiosResponse } from 'axios';
import { MessageType } from '../store/slices/chatMessagesSlice.ts';

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
  private errorCount: number = 0;

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
            messages?.map((message: { message: string; date_create: string; user: MessageType }) => {
              this.handleMessage({
                message: message.message,
                type: message.user,
              });
            });
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.type !== 'OPERATOR' || lastMessage.type !== 'USER') {
              this.stopPolling();
            }
          }
        } catch (error) {
          this.errorCount += 1;
          if (this.errorCount > 5) {
            this.stopPolling();
            console.error('Произошла ошибка при получении данных GetMessageService 2');
            this.handleMessage({
              message: 'Произошла ошибка при получении данных с сервера. Попробуйте позднее.',
              type: 'ERROR',
            });
          }
          console.error('Произошла ошибка при получении данных GetMessageService 1 | ', this.errorCount);
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

  private handleMessage: MessageHandler = () => {};

  private handleStopPooling: StopPoolingHandler = () => {};
}

const getMessageService = new GetMessageService();

export default getMessageService;
