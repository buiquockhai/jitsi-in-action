import JitsiFrame from './jitsi';
import ManagePanel from './manage-panel';

const MeetingPane = () => {
  return (
    <div className="w-full grid grid-cols-6 gap-3 h-[80vh]">
      <JitsiFrame />
      <ManagePanel />
    </div>
  );
};

export default MeetingPane;
