import mainApi from '../../shared/api/mainApi';
import { AxiosResponse } from 'axios';
import { MessageType } from '../store/slices/chatMessagesSlice';
import { MAX_RETRY_ATTEMPTS_MESSAGE_FROM_SERVER, MESSAGE_POLLING_INTERVAL, TIMI_OUT_CHAT_REQUEST } from '../../shared/lib/const/const.ts';

interface IMessageHandler {
  (messageData: { message: string; type: MessageType }): void;
}

interface IStopPoolingHandler {
  (stopPoolingData: { isPooling: boolean }): void;
}

interface IHandleSetWaitMessage {
  (SetWaitMessage: { waitMessageFromServer: boolean }): void;
}

interface IMessageData {
  message: string;
  date_create: string;
  user: MessageType;
}

/**
 * Класс `GetMessageService` отвечает за получение сообщений с сервера через опрос.
 * Он управляет началом и остановкой опроса, обрабатывает полученные сообщения и ошибки.
 */
class GetMessageService {
  private isPolling: boolean = false;
  private errorCount: number = 0;
  // Переменная для хранения времени последнего сообщения
  private lastMessageTime: Date | null = null;

  constructor(
    private maxRetryAttemptsMessageFromServer: number = 3,
    private messagePollingInterval: number = 5,
    private timeoutChatRequest: number = 10
  ) {}

  /**
   * Проверяет значение переменной pollingInterval и запускает процесс для получения данных с сервера
   */
  startPollingForData = async (): Promise<void> => {
    while (this.isPolling) {
      if (!this.isChatActive()) {
        this.stopPolling();
        break;
      }
      // Ждем N секунд перед следующим опросом
      await new Promise((resolve) => setTimeout(resolve, this.messagePollingInterval * 1000));
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
    if (this.isPolling) {
      this.isPolling = false;
      this.handleStopPooling({ isPooling: false });
      this.handleSetWaitMessage({ waitMessageFromServer: false });
    }
  };

  /**
   * Начинает процесс пуллинга сообщений с сервера
   */
  startPolling = (): void => {
    this.lastMessageTime = new Date();
    this.isPolling = true;
  };

  /**
   * Обработчик сообщений
   * @param handleMessage функция добавления сообщений в хранилище Redux
   */
  setHandleMessage = (handleMessage: IMessageHandler): void => {
    this.handleMessage = handleMessage;
  };

  /**
   * Остановка пуллинга из вне
   * @param handleStopPooling
   */
  setHandleStopPooling = (handleStopPooling: IStopPoolingHandler): void => {
    this.handleStopPooling = handleStopPooling;
  };

  /**
   * Функция устанавливает значение переменной о том что сообщение получено с севрера
   * Чтоб не отображались 3 точки в чате
   * @param handleMessageWait
   */
  setHandleMessageWaitFromServer = (handleMessageWait: IHandleSetWaitMessage): void => {
    this.handleSetWaitMessage = handleMessageWait;
  };

  private isChatActive = (): boolean => {
    if (!this.lastMessageTime) {
      return false; // Нет сообщений, чат не активен
    }

    const currentTime = new Date();
    const diffInMinutes = (currentTime.getTime() - this.lastMessageTime.getTime()) / (1000 * 60);
    // Возвращаем true, если прошло менее или равно 10 минут
    return diffInMinutes <= this.timeoutChatRequest;
  };

  private handleMessage: IMessageHandler = () => {};

  private handleStopPooling: IStopPoolingHandler = () => {};

  private handleSetWaitMessage: IHandleSetWaitMessage = () => {};

  /**
   * Обрабатывает полученные сообщения с сервера
   * @param messages
   */
  private handleMessages = (messages: IMessageData[]): void => {
    if (messages && messages.length > 0) {
      // Обновляем время последнего сообщения
      this.lastMessageTime = new Date();
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
  private shouldStopPolling = (messages: IMessageData[]): boolean => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage.user !== 'OPERATOR' && lastMessage.user !== 'USER';
  };

  /**
   * Добавление полученных сообщений, сообщения в хранилище Redux
   * @param messages - сообщения полученные с сервера
   */
  private processMessages = (messages: IMessageData[]): void => {
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
    //Сообщение получено
    this.handleSetWaitMessage({ waitMessageFromServer: false });
  };

  /**
   * Обработчик ошибок при получении данных с сервера
   * Вызывается из функции `startPollingForData`
   */
  private handleError = (): boolean => {
    this.errorCount += 1;
    if (this.errorCount > this.maxRetryAttemptsMessageFromServer) {
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

const getMessageService = new GetMessageService(MAX_RETRY_ATTEMPTS_MESSAGE_FROM_SERVER, MESSAGE_POLLING_INTERVAL, TIMI_OUT_CHAT_REQUEST);

export default getMessageService;
