import { Button } from 'antd';
import Container from '@layout/main/container';
import { useRouter } from 'next/router';
import { ROUTES } from '@util/routes';
import { useSystemContext } from '@context/system';
import { RoleEnum } from '@util/constant';

const Landing = () => {
  const { push } = useRouter();
  const { role } = useSystemContext();

  const handleViewSchedule = () => {
    push(
      role === RoleEnum.teacher ? ROUTES.TEACHER_SCHEDULE : ROUTES.STUDENT_SCHEDULE
    );
  };

  return (
    <div className="w-full bg-background">
      <Container>
        <div
          className="w-full flex flex-row items-center justify-between gap-5"
          style={{ minHeight: 'calc(100vh - 50px)' }}
        >
          <div className="grid grid-cols-2 w-full">
            <div className="max-w-lg flex flex-col gap-10">
              <p className="text-6xl">
                <span className="font-bold">Tham gia kì thi online</span>{' '}
                <span className="text-primary font-bold">hiệu quả</span>
              </p>

              <div className="flex flex-row gap-3">
                <Button size="large" onClick={handleViewSchedule}>
                  Xem lịch thi
                </Button>
              </div>
            </div>

            <div className="w-full min-h-full flex items-center justify-center max-w-xl">
              <img
                className="h-[50vh]"
                src={
                  role === RoleEnum.teacher
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
