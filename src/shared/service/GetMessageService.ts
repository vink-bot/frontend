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

  // Установка обработчика сообщений
  setHandleMessage(handleMessage: MessageHandler): void {
    this.handleMessage = handleMessage;
  }

  // Установка обработчика остановки пуллинга
  setHandleStopPooling(handleStopPooling: StopPoolingHandler): void {
    this.handleStopPooling = handleStopPooling;
  }

  // Запуск циклического опроса сервера и обновления хранилища Redux
  async startPollingForData(): Promise<void> {
    console.log('Init Pooling');
    if (this.isPolling) {
      console.log('Start Pooling');
      this.pollingInterval = setInterval(async () => {
        try {
          const response: AxiosResponse = await mainApi.getMessage();
          const { message, user } = response.data;
          this.handleMessage({ message, type: user }); // Обновляем состояние Redux
        } catch (error) {
          console.error('Произошла ошибка при получении данных:', error);
          this.stopPolling();
        }
      }, 5000); // Интервал опроса сервера (5000 мс = 5 секунд)
    }
  }

  // Остановка циклического опроса
  stopPolling(): void {
    console.log('Stop Pooling');
    this.handleStopPooling({ isPooling: false });
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      this.isPolling = false;
    }
  }

  // Запуск циклического опроса
  startPolling(): void {
    this.isPolling = true;
  }
}

const getMessageService = new GetMessageService();

export default getMessageService;
