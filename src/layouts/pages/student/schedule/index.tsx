import { useSystemContext } from '@context/system';
import { useFetchRooms } from '@hook/room/useFetchRooms';
import { useFetchUserDetail } from '@hook/user/useFetchUserDetail';
import { RoomResponse } from '@service/room/types';
import { Badge, Calendar, List, Modal } from 'antd';
import moment, { Moment } from 'moment';
import React, { Fragment, useState } from 'react';
import EventModal from './event-modal';

const StudentCalendar = () => {
  const { userId } = useSystemContext();

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<RoomResponse[]>([]);

  const userDetail = useFetchUserDetail(userId);
  const rooms = useFetchRooms({ group_id: userDetail?.group_id });

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

  const handleShowDetail = (events: RoomResponse[]) => {
    setOpen(true);
    setEvents(events);
  };

  const dateCellRender = (date: Moment) => {
    const dayEvents = getDayEvent(date);

    return (
      <ul onClick={() => handleShowDetail(dayEvents)}>
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

  return (
    <Fragment>
      <Calendar dateCellRender={dateCellRender} />
      <EventModal open={open} data={events} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default StudentCalendar;
