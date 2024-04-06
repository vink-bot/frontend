import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MAIN_API_URI } from '../lib/const/api.ts';

interface ApiConfig {
  baseUrl: string;
  headers: Record<string, string>;
}

class Api {
  private instance: AxiosInstance;
  private _chatToken: string | null;

  constructor({ baseUrl, headers }: ApiConfig) {
    this._chatToken = null;
    this.instance = axios.create({
      baseURL: baseUrl,
      headers,
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error.response);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  setChatToken(value: string) {
    this._chatToken = value;
  }

  private _request(
    url: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    // Добавляем токен к заголовкам запроса, если он установлен
    if (this._chatToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['chat-token'] = `${this._chatToken}`;
    }
    return this.instance.request({ url, ...config });
  }

  setToken(token: string) {
    this._chatToken = token;
  }

  sendMessage(message: string): Promise<AxiosResponse> {
    return this._request('/gpt', {
      method: 'POST',
      data: { message },
    });
  }

  getMessage(): Promise<AxiosResponse> {
    return this._request('/message', {
      method: 'get',
      data: {},
    });
  }
}

const MainApi = new Api({
  baseUrl: MAIN_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MainApi;
