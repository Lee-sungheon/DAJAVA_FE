import axios from 'axios';

import { DAJAAVA_API_URL } from '@dajava/constants/siteUrl';

interface IRequestOptions {
  headers?: Record<string, string>;
}

interface IApiResponse<T> {
  data: T;
  headers: Record<string, string>;
}

const get = async <T>(url: string, options?: IRequestOptions, domain = DAJAAVA_API_URL): Promise<IApiResponse<T>> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${domain}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      withCredentials: true,
    });

    return {
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
    throw error;
  }
};

const post = async <T, D = unknown>(
  url: string,
  data: D,
  options?: IRequestOptions,
  domain = DAJAAVA_API_URL,
): Promise<IApiResponse<T>> => {
  try {
    const headers =
      data instanceof FormData
        ? { ...options?.headers }
        : {
            'Content-Type': 'application/json',
            ...options?.headers,
          };

    const response = await axios({
      method: 'post',
      url: `${domain}${url}`,
      data: data instanceof FormData ? data : JSON.stringify(data),
      headers,
      withCredentials: true,
    });

    console.log(response);
    return {
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
    throw error;
  }
};

const patch = async <T, D = unknown>(url: string, data: D, options?: IRequestOptions): Promise<IApiResponse<T>> => {
  try {
    const headers =
      data instanceof FormData
        ? { ...options?.headers }
        : {
            'Content-Type': 'application/json',
            ...options?.headers,
          };

    const response = await axios({
      method: 'patch',
      url: `${DAJAAVA_API_URL}${url}`,
      data: data instanceof FormData ? data : JSON.stringify(data),
      headers,
      withCredentials: true,
    });

    return {
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
    throw error;
  }
};

const _delete = async <T>(url: string, options?: IRequestOptions): Promise<IApiResponse<T>> => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${DAJAAVA_API_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      withCredentials: true,
    });

    return {
      data: response.data,
      headers: response.headers as Record<string, string>,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
    throw error;
  }
};

const proxyGet = async <T>(url: string, options?: IRequestOptions): Promise<IApiResponse<T>> => {
  return await get(`/api/proxy?path=${encodeURIComponent(url)}`, options, window.location.origin);
};

const proxyPost = async <T, D = unknown>(url: string, data: D, options?: IRequestOptions): Promise<IApiResponse<T>> => {
  return await post(`/api/proxy?path=${encodeURIComponent(url)}`, data, options, window.location.origin);
};

export { get, post, patch, _delete as delete, proxyGet, proxyPost };
