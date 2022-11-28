import withAuth from '@hoc/withAuth';
import TeacherCounter from '@layout/pages/teachers/start/counter';
import ExamView from '@layout/pages/teachers/start/exam-view';
import TeacherStartManage from '@layout/pages/teachers/start/manage';
import MeetingPane from '@layout/pages/teachers/start/meeting';
import RoomInformation from '@layout/pages/teachers/start/room-info';
import { userRoomService } from '@service/router';
import { RoleEnum, RoleTypes } from '@util/constant';
import { ROUTES } from '@util/routes';
import { Tabs } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const StartPage: NextPage = () => {
  return (
    <div className="w-full p-5 min-h-full relative">
      <div className="absolute right-5 top-5 flex items-end gap-5 z-10">
        <TeacherCounter />
      </div>
      <div className="card-container min-h-full">
        <Tabs type="card">
          <Tabs.TabPane tab="Meeting" key="1">
            <MeetingPane />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chi tiết" key="2">
            <TeacherStartManage />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đề thi" key="3">
            <ExamView />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thông tin phòng thi" key="4">
            <RoomInformation />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ res, req, query }: GetServerSidePropsContext) => {
    const verify = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user-room/verify-join-room`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${req.cookies.__token}`,
        },
        body: JSON.stringify({
          room_id: query.id as string,
          role: req.cookies.__role as RoleTypes,
        }),
      }
    );
    if (!verify) {
      res.writeHead(302, { Location: ROUTES.TEACHER_SCHEDULE });
      res.end();
    }
    return {
      props: {},
    };
  },
  RoleEnum.teacher
);

export default StartPage;
