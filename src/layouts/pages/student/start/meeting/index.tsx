import dynamic from 'next/dynamic';
import { IJitsiMeetingProps } from '@jitsi/react-sdk/lib/types';
import { useRouter } from 'next/router';
import { useSystemContext } from '@context/system';

const MeetingPane = () => {
  const { query } = useRouter();
  const { name } = useSystemContext();

  const JitsiMeeting = dynamic(
    () => import('@jitsi/react-sdk').then(({ JitsiMeeting }) => JitsiMeeting) as any,
    {
      ssr: false,
    }
  ) as React.FC<IJitsiMeetingProps>;

  return (
    <div className="w-full h-[80vh] bg-red-50">
      <JitsiMeeting
        domain="meet.distributed-systems.xyz"
        roomName={query.id as string}
        userInfo={{
          displayName: name,
          email: '',
        }}
        configOverwrite={{
          hideConferenceSubject: true,
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
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
        }}
      />
    </div>
  );
};

export default MeetingPane;
