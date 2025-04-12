'use client';

import Script from 'next/script';
import { useEffect } from 'react';

import { DAJAAVA_SDK_URL } from '@dajava/constants/siteUrl';
import { UserEventRecorder } from '@dajava/sdk/eventRecorder';

declare global {
  interface Window {
    dajava: {
      UserEventRecorder: typeof UserEventRecorder;
    };
  }
}

const DajavaSdkLayer = () => {
  useEffect(() => {
    const userEventRecorder = new window.dajava.UserEventRecorder({
      memberSerialNumber: '5_team_testSerial',
      // memberSerialNumber: '0fc0981d-a91d-41d9-8c94-161b5d0e0e41',
    });
    userEventRecorder.startRecording();

    return () => userEventRecorder.stopRecording();
  }, []);

  return <Script strategy={'beforeInteractive'} src={DAJAAVA_SDK_URL} />;
};

DajavaSdkLayer.displayName = 'DajavaSdkLayer';

export default DajavaSdkLayer;
