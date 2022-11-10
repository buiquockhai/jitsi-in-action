import React from 'react';
import { Timeline, Button } from 'antd';
import Container from '@layout/main/container';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { roles } from '@util/constant';

const Landing = () => {
  const { push } = useRouter();
  const { role } = useSystemContext();

  const handleStart = () => {
    push(ROUTES.TEACHER_START('__room_1'));
  };

  const handleViewSchedule = () => {
    push(role === roles.teacher ? ROUTES.TEACHER_SCHEDULE : ROUTES.STUDENT_SCHEDULE);
  };

  return (
    <div className="w-full bg-background">
      <Container>
        <div
          className="w-full flex flex-row items-center justify-between gap-5"
          style={{ minHeight: 'calc(100vh - 50px)' }}
        >
          <div className="grid grid-cols-2 w-full">
            <div className="max-w-lg flex flex-col gap-0">
              <p className="text-6xl">
                <span className="font-bold">Tham gia kì thi online</span>{' '}
                <span className="text-primary font-bold">hiệu quả</span>
              </p>
              <div className="mt-10">
                <Timeline mode="left">
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Create a services
                  </Timeline.Item>
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Solve initial network problems
                  </Timeline.Item>
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Technical testing
                  </Timeline.Item>
                  <Timeline.Item label="2015-09-01 09:12:11">
                    Network problems being solved
                  </Timeline.Item>
                </Timeline>
              </div>

              <div className="flex flex-row gap-3">
                <Button type="primary" size="large" onClick={handleStart}>
                  Bắt đầu
                </Button>
                <Button size="large" onClick={handleViewSchedule}>
                  Xem lịch thi
                </Button>
              </div>
            </div>

            <div className="w-full min-h-full flex items-center justify-center max-w-xl">
              <img
                className="h-[50vh]"
                src={
                  role === roles.teacher
                    ? '/assets/__home_page.svg'
                    : '/assets/__home_page_student.svg'
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Landing;
