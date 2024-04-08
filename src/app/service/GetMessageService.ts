import mainApi from '../../shared/api/mainApi';
import { AxiosResponse } from 'axios';
import { MessageType } from '../store/slices/chatMessagesSlice';

interface MessageHandler {
  (messageData: { message: string; type: MessageType }): void;
}

interface StopPoolingHandler {
  (stopPoolingData: { isPooling: boolean }): void;
}

interface MessageData {
  message: string;
  date_create: string;
  user: MessageType;
}

/**
 * Класс `GetMessageService` отвечает за получение сообщений с сервера через опрос.
 * Он управляет началом и остановкой опроса, обрабатывает полученные сообщения и ошибки.
 */
class GetMessageService {
  //private pollingInterval: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;
  private errorCount: number = 0;

  /**
   * Проверяет значение переменной pollingInterval и запускает процесс для получения данных с сервера
   */
  startPollingForData = async (): Promise<void> => {
    while (this.isPolling) {
      // Ждем 3 секунды перед следующим опросом
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response: AxiosResponse = await mainApi.getMessage();
        const { messages } = response.data;
        this.handleMessages(messages);
      } catch (error) {
        if (this.handleError()) break; // прерываем цикл в случае ошибки
      }
    }
  };

  /**
   * Останавливает пуллинг сообщений
   */
  stopPolling = (): void => {
    console.log('Stop Pooling');
    if (this.isPolling) {
      this.isPolling = false;
      this.handleStopPooling({ isPooling: false });
    }
  };

  /**
   * Начинает процесс пуллинга сообщений с сервера
   */
  startPolling = (): void => {
    this.isPolling = true;
  };

  /**
   * Обработчик сообщений
   * @param handleMessage функция добавления сообщений в хранилище Redux
   */
  setHandleMessage = (handleMessage: MessageHandler): void => {
    this.handleMessage = handleMessage;
  };

  /**
   * Остановка пуллинга из вне
   * @param handleStopPooling
   */
  setHandleStopPooling = (handleStopPooling: StopPoolingHandler): void => {
    this.handleStopPooling = handleStopPooling;
  };

  private handleMessage: MessageHandler = () => {};

  private handleStopPooling: StopPoolingHandler = () => {};

  /**
   * Обрабатывает полученные сообщения с сервера
   * @param messages
   */
  private handleMessages = (messages: MessageData[]): void => {
    if (messages && messages.length > 0) {
      this.processMessages(messages);
      if (this.shouldStopPolling(messages)) {
        this.stopPolling();
      }
    }
  };

  /**
   * Проверить, нужно ли остановить пуллинг.
   * Если последний ответ был от оператора или пользователя, то пуллинг продолжится
   * Если последнее сообщение отправил GPT или была ошибка, то пуллинг остановится
   * @param messages
   */
  private shouldStopPolling = (messages: MessageData[]): boolean => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage.user !== 'OPERATOR' && lastMessage.user !== 'USER';
  };

  /**
   * Добавление полученных сообщений, сообщения в хранилище Redux
   * @param messages - сообщения полученные с сервера
   */
  private processMessages = (messages: MessageData[]): void => {
    messages.forEach((message: { message: string; date_create: string; user: MessageType }) => {
      if (message.message == 'Чат окончен.') {
        this.stopPolling();
        return;
      }
      this.handleMessage({
        message: message.message,
        type: message.user,
      });
    });
  };

  /**
   * Обработчик ошибок при получении данных с сервера
   * Вызывается из функции `startPollingForData`
   */
  private handleError = (): boolean => {
    this.errorCount += 1;
    if (this.errorCount > 3) {
      this.errorCount = 0;
      this.stopPolling();
      console.error('Произошла ошибка при получении данных с сервера.');
      this.handleMessage({
        message: 'Произошла ошибка. Попробуйте позднее.',
        type: 'ERROR',
      });

      return true;
    }
    return false;
  };
}

const getMessageService = new GetMessageService();

export default getMessageService;
