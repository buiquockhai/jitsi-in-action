import { __token } from './constant';

type Headers = Record<string, string>;

export class Client {
  headers: Headers = {
    'Content-Type': 'application/json',
  };

  privateHeaders: Headers = {
    ...this.headers,
  };

  baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  public setAuthToken(token) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers };
  }
}

const client = new Client();

export { client };
