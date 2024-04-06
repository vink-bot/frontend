import mainApi from '../api/mainApi.ts';
import { AxiosResponse } from 'axios';
import { MessageType } from '../../app/store/slices/chatSlice.ts';

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
        console.log(this.pollingInterval);
        try {
          const response: AxiosResponse = await mainApi.getMessage();
          const { message, user } = response.data;
          this.handleMessage({ message, type: user }); // Обновляем состояние Redux
        } catch (error) {
          console.error('Произошла ошибка при получении данных SetInterval');
          this.stopPolling();
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
