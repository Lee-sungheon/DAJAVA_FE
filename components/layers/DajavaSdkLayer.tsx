'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

import { DAJAAVA_SDK_URL } from '@dajava/constants/siteUrl';
import { UserEventRecorder } from '@dajava/sdk/eventRecorder';

declare global {
  interface Window {
    dajava: {
      UserEventRecorder: typeof UserEventRecorder;
    };
  }
}

let isSdkInitialized = false;

const DajavaSdkLayer = () => {
  const recorderRef = useRef<UserEventRecorder | null>(null);

  useEffect(() => {
    if (!window.dajava || isSdkInitialized) {
      return;
    }

    isSdkInitialized = true;
    recorderRef.current = new window.dajava.UserEventRecorder({
      memberSerialNumber: '5_team_testSerial',
      // memberSerialNumber: '6130d5c2-f7ab-4d9d-a398-ea79e28d3ecc',
    });
    recorderRef.current.startRecording();

    return () => {
      if (recorderRef.current) {
        recorderRef.current.stopRecording();
        recorderRef.current = null;
      }
    };
  }, []);

  return <Script strategy={'beforeInteractive'} src={DAJAAVA_SDK_URL} />;
};

DajavaSdkLayer.displayName = 'DajavaSdkLayer';

export default DajavaSdkLayer;
