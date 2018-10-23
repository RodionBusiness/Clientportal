import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

class WebServerService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.CLEARING_WEB_SERVICE_URI,
      withCredentials: true,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  public request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.processResponse(this.http.request(config));
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.processResponse(this.http.get(url, config));
  }

  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.processResponse(this.http.delete(url, config));
  }

  public head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.processResponse(this.http.head(url, config));
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.processResponse(this.http.post(url, data, config));
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.processResponse(this.put(url, data, config));
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.processResponse(this.http.patch(url, data, config));
  }

  private processResponse<T = any>(promise: AxiosPromise<T>): AxiosPromise<T> {
    return promise.catch(data => {
      if(!data.status){
        throw new Error('Cannot connect to server, please check your Internet connection.');
      }

      throw new Error(data.response);
    })
  }
}

export const WebServer = new WebServerService();
