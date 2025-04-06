'use client';

import Script from 'next/script';
import { useEffect } from 'react';

import { DAJAAVA_SDK_URL } from '@dajava/constants/siteUrl';
import { UserEventRecorder } from '@dajava/sdk/eventRecorder';

const DajavaSdkLayer = () => {
  useEffect(() => {
    const userEventRecorder = new UserEventRecorder();
    userEventRecorder.startRecording();

    return () => userEventRecorder.stopRecording();
  }, []);

  return <Script strategy={'beforeInteractive'} src={DAJAAVA_SDK_URL} />;
};

DajavaSdkLayer.displayName = 'DajavaSdkLayer';

export default DajavaSdkLayer;
