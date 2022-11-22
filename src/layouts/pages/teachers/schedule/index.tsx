import { useSystemContext } from '@context/system';
import { useFetchRooms } from '@hook/room/useFetchRooms';
import { Badge, Button, Calendar, List, Modal } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';

const TeacherCalendar = () => {
  const { userId } = useSystemContext();

  const rooms = useFetchRooms({
    proctor_id: userId,
  });

  console.log({ rooms, userId });

  const getDayEvent = (date: Moment) => {
    const events = (rooms ?? []).filter((item) => {
      const time = moment(item.start_date);
      return (
        time.date() === date.date() &&
        time.month() === date.month() &&
        time.year() === date.year()
      );
    });
    return events;
  };

  const dateCellRender = (date: Moment) => {
    const dayEvents = getDayEvent(date);

    return (
      <ul onClick={() => handleOpenDetail(dayEvents)}>
        {dayEvents.map((item) => {
          const currentTime = new Date();
          const time = moment(item.start_date).toDate().getTime();
          const status = time > currentTime.getTime() ? 'success' : 'default';

          return (
            <li key={item.id}>
              <Badge
                status={status}
                text={`${moment(item?.start_date).format('HH:mm')} - ${item?.title}`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const handleJoin = (id: string) => {
    console.log({ id });
  };

  const handleOpenDetail = (data) => {
    const time = data?.[0]?.startDate;

    return Modal.info({
      width: '40vw',
      title: `Lịch thi ngày ${moment(time).format('DD/MM/YYYY')}`,
      content: (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button
                  key={item.id}
                  type="primary"
                  onClick={() => handleJoin(item.id)}
                >
                  Tham gia
                </Button>,
              ]}
            >
              {moment(item?.startDate).format('HH:mm DD/MM/YYYY')} - {item?.title}
            </List.Item>
          )}
        />
      ),
    });
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default TeacherCalendar;
