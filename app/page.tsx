'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { css } from '@dajava/panda-css/css';
import { Flex } from '@dajava/styled-system/jsx';

declare global {
  interface Window {
    dajava: {
      UserEventRecorder: new () => {
        startRecording: () => void;
        stopRecording: () => void;
      };
    };
  }
}

export default function Home() {
  const [isLoadedDajavaScript, setIsLoadedDajavaScript] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.dajava.link/event-recorder.js';
    script.async = true;
    script.onload = async () => {
      setIsLoadedDajavaScript(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoadedDajavaScript || !window.dajava) {
      return;
    }

    // const userEventRecorder = new UserEventRecorder();
    const userEventRecorder = new window.dajava.UserEventRecorder();
    userEventRecorder.startRecording();

    return () => userEventRecorder.stopRecording();
  }, [isLoadedDajavaScript]);

  return (
    <div>
      <main>
        <Flex css={{ p: '50px' }}>
          <img
            src={'https://static.zaritalk.com/favicon/android-chrome-256x256.png'}
            alt={'Zaritalk logo'}
            width={180}
            height={180}
            className={css({ m: '100px' })}
          />
        </Flex>
        <ol>
          <li>
            {'Get started by editing '}<code>{'app/page.tsx'}</code>{'.'}
          </li>
          <li>{'Save and see your changes instantly.'}</li>
        </ol>

        <div>
          <a
            href={'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            <Image
              src={'/vercel.svg'}
              alt={'Vercel logomark'}
              width={20}
              height={20}
            />
            {'Deploy now'}
          </a>
          <a
            href={'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            {'Read our docs'}
          </a>
        </div>
      </main>
      <a
        href={'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        <Image
          aria-hidden
          src={'/file.svg'}
          alt={'File icon'}
          width={16}
          height={16}
        />
        {'Learn'}
      </a>
      <a
        href={'https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        <Image
          aria-hidden
          src={'/window.svg'}
          alt={'Window icon'}
          width={16}
          height={16}
        />
        {'Examples'}
      </a>
      <a
        href={'https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        <Image
          aria-hidden
          src={'/globe.svg'}
          alt={'Globe icon'}
          width={16}
          height={16}
        />
        {'Go to nextjs.org →'}
      </a>
    </div>
  );
}
