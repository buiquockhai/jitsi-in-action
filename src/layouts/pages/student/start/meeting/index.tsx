import JitsiFrame from './jitsi';
import StudentList from './student-list';

const MeetingPane = () => {
  return (
    <div className="w-full grid grid-cols-6 gap-3 h-[80vh]">
      <JitsiFrame />
      <StudentList />
    </div>
  );
};

export default MeetingPane;
