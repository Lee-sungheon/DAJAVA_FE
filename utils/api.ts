import { DAJAAVA_API_URL } from '@dajava/constants/siteUrl';

interface IRequestOptions {
  headers?: Record<string, string>;
}

const get = async <T>(url: string, options?: IRequestOptions): Promise<T> => {
  const response = await fetch(`${DAJAAVA_API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as unknown as T;
};

const post = async <T, D = unknown>(url: string, data: D, options?: IRequestOptions): Promise<T> => {
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
    const errorData = await response.json();
    throw errorData;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as unknown as T;
};

const patch = async <T, D = unknown>(url: string, data: D, options?: IRequestOptions): Promise<T> => {
  const headers =
    data instanceof FormData
      ? { ...options?.headers }
      : {
          'Content-Type': 'application/json',
          ...options?.headers,
        };

  const response = await fetch(`${DAJAAVA_API_URL}${url}`, {
    method: 'PATCH',
    headers,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as unknown as T;
};

const _delete = async <T>(url: string, options?: IRequestOptions): Promise<T> => {
  const response = await fetch(`${DAJAAVA_API_URL}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as unknown as T;
};

export { get, post, patch, _delete as delete };
