import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { DAJAAVA_API_URL } from '@dajava/constants/siteUrl';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const response = await axios({
      method: 'get',
      url: `${DAJAAVA_API_URL}${path}`,
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      withCredentials: true,
    });

    const headers = new Headers();
    if (response.headers['set-cookie']) {
      const cookies = Array.isArray(response.headers['set-cookie'])
        ? response.headers['set-cookie'].join('; ')
        : response.headers['set-cookie'];
      headers.set('set-cookie', cookies);
    }

    return NextResponse.json(response.data, { headers });
  } catch (error) {
    console.error('Proxy error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    const body = await request.json();

    const response = await axios({
      method: 'post',
      url: `${DAJAAVA_API_URL}${path}`,
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      data: body,
      withCredentials: true,
    });

    const headers = new Headers();
    if (response.headers['set-cookie']) {
      const cookies = Array.isArray(response.headers['set-cookie'])
        ? response.headers['set-cookie'].join('; ')
        : response.headers['set-cookie'];
      headers.set('set-cookie', cookies);
    }

    return NextResponse.json(response.data, { headers });
  } catch (error) {
    console.error('Proxy error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
