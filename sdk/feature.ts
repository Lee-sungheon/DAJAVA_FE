import { DAJAAVA_API_URL, DAJAVA_PROXY_URL } from '../constants/siteUrl';

interface IRequestOptions {
  headers?: Record<string, string>;
}

export const post = async <T, D = unknown>(url: string, data: D, options?: IRequestOptions): Promise<T> => {
  const headers =
    data instanceof FormData
      ? { ...options?.headers }
      : {
          'Content-Type': 'application/json',
          ...options?.headers,
        };

  const response = await fetch(`${DAJAAVA_API_URL}${url}`, {
    method: 'POST',
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit data');
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as unknown as T;
};

export const throttle = <Params extends unknown[]>(callback: (...args: Params) => unknown, delayMs: number) => {
  let timeoutId: NodeJS.Timeout | null;

  return (...args: Params) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback(...args);
        timeoutId = null;
      }, delayMs);
    }
  };
};

const imageCache = new Map();

export const getCachedBase64 = async (url: string) => {
  if (imageCache.has(url)) {
    return imageCache.get(url);
  } else {
    const promise = getBase64FromUrl(url);
    imageCache.set(url, promise);
    return promise;
  }
};

export const getBase64FromUrl = async (url: string) => {
  const response = await fetch(`${DAJAVA_PROXY_URL}/proxy?url=${url}`);
  const blob = await response.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(String(base64data));
    };
  });
};
