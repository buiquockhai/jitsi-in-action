import { useSystemContext } from '@context/system';
import { useFetchUserInRoom } from '@hook/user-room/useFetchUserRoom';
import { GetUserRoomResponse } from '@service/user-room/types';
import { Badge, Calendar } from 'antd';
import moment, { Moment } from 'moment';
import { Fragment, useState } from 'react';
import EventModal from './event-modal';

const StudentCalendar = () => {
  const { userId } = useSystemContext();

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<GetUserRoomResponse[]>([]);

  const userInRoom = useFetchUserInRoom({ user_id: userId });

  const getDayEvent = (date: Moment) => {
    const events = (userInRoom ?? []).filter((item) => {
      const time = moment(item.tb_room.start_date);
      return (
        time.date() === date.date() &&
        time.month() === date.month() &&
        time.year() === date.year()
      );
    });
    return events;
  };

  const handleShowDetail = (events: GetUserRoomResponse[]) => {
    setOpen(true);
    setEvents(events);
  };

  const dateCellRender = (date: Moment) => {
    const dayEvents = getDayEvent(date);

    return (
      <ul onClick={() => handleShowDetail(dayEvents)}>
        {dayEvents.map((item) => {
          const currentTime = new Date();
          const time = moment(item.tb_room.start_date).toDate().getTime();
          const status = time > currentTime.getTime() ? 'success' : 'default';

          return (
            <li key={item.id}>
              <Badge
                status={status}
                text={`${moment(item.tb_room.start_date).format('HH:mm')} - ${
                  item.tb_room.title
                }`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Fragment>
      <Calendar dateCellRender={dateCellRender} />
      <EventModal open={open} data={events} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default StudentCalendar;
