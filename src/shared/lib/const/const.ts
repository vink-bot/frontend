export const MAIN_API_URI: string = '//77.232.128.89/api/v1';
// Через какое время считать переписку законченной если не поступали сообщения
export const TIMI_OUT_CHAT_REQUEST: number = 10;
// Максимальное количество попыток получения сообщения с сервера
export const MAX_RETRY_ATTEMPTS_MESSAGE_FROM_SERVER: number = 3;
// Интервал (в миллисекундах) между запросами на сервер для получения сообщений
export const MESSAGE_POLLING_INTERVAL: number = 3;
