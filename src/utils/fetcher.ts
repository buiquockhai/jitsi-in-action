import fetch from 'isomorphic-unfetch';
import { message } from 'antd';

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try {
    const res = await fetch(input, init);
    if (res.ok) {
      return res.json();
    }
    if (res) {
      const data = (await res.json()) as any;
      const messageText = data?.message || data?.data?.message || 'Không thành công';
      message.error(messageText);
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject();
  }
}
