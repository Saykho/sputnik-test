import axios from "axios";

const BACKEND_URL = "https://hp-api.onrender.com/api";

const instance = axios.create({
  baseURL: BACKEND_URL,
});

export class HttpClient {
  static post<T>(url: string, data: any): Promise<T> {
    return instance.post<T>(url, data).then((x) => x.data);
  }

  static put<T>(url: string, data: any): Promise<T> {
    return instance.put<T>(url, data).then((x) => x.data);
  }

  static get<T>(
    url: string,
    params?: {
      [k: string]: string | number | null | undefined;
    },
  ): Promise<T> {
    return instance
      .get<T>(url, {
        params,
      })
      .then((x) => x.data);
  }

  static delete<T>(url: string, data: any): Promise<T> {
    return instance.delete<T>(url, { data }).then((x) => x.data);
  }
}
