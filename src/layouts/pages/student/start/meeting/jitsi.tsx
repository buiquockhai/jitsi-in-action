import dynamic from 'next/dynamic';
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types';
import React from 'react';
import { useRouter } from 'next/router';

const JitsiFrame: React.FC<any> = () => {
  const { replace } = useRouter();

  const JitsiMeeting = dynamic(
    () => import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting) as any,
    {
      ssr: false,
    }
  ) as React.FC<IJitsiMeetingProps>;

  return (
    <div className="w-full col-span-5 min-h-full bg-red-50">
      <JitsiMeeting
        domain="meet.distributed-systems.xyz"
        roomName="PleaseUseAGoodRoomName"
        configOverwrite={{
          hideConferenceTimer: true,
          disablePolls: true,
          disableSelfViewSettings: true,
          hideAddRoomButton: true,
          enableClosePage: true,
          hideEmailInSettings: true,
          toolbarButtons: [
            'camera',
            'chat',
            'fullscreen',
            'microphone',
            'raisehand',
            'toggle-camera',
            'select-background',
            'etherpad',
            'desktop',
            'participants-pane',
            'highlight',
          ],
        }}
        // onApiReady={(externalApi) => {}}
        onReadyToClose={() => {
          replace('/');
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
        }}
      />
    </div>
  );
};

export default JitsiFrame;
