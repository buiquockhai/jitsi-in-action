import { getNextMonth, getPreviousMonth } from '@util/functions';
import { Badge, BadgeProps, Calendar, List, Modal } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import { v4  } from 'uuid';

const getListByMonth = (month: number, year: number) => {
  const monthData = {
    7: {
      10: [
        {
          id: v4(),
          title: 'This is title',
          startDate: new Date(),
          workingTime: 100,
          teacherId: v4(),
          teacherName: 'Teacher Name',
        },
      ],
      20: [
        {
          id: v4(),
          title: 'This is title',
          startDate: new Date(),
          workingTime: 100,
          teacherId: v4(),
          teacherName: 'Teacher Name',
        },
      ],
    },
    8: {
      15: [
        {
          id: v4(),
          title: 'This is title',
          startDate: new Date(),
          workingTime: 100,
          teacherId: v4(),
          teacherName: 'Teacher Name',
        },
      ],
      16: [
        {
          id: v4(),
          title: 'This is title',
          startDate: new Date(),
          workingTime: 100,
          teacherId: v4(),
          teacherName: 'Teacher Name',
        },
      ],
      20: [
        {
          id: v4(),
          title: 'This is title',
          startDate: new Date(),
          workingTime: 100,
          teacherId: v4(),
          teacherName: 'Teacher Name',
        },
      ],
    },
  };

  return {
    prevous: monthData[getPreviousMonth(month)] || [],
    now: monthData[month] || [],
    next: monthData[getNextMonth(month)] || [],
  };
};

const getListData = (value: Moment) => {
  const dataByMonth = getListByMonth(value.month(), value.year());
  return dataByMonth.now?.[value.date()] || [];
};

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const TeacherCalendar: React.FC<any> = () => {
  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <ul onClick={() => handleOpenDetail(listData)}>
        {listData.map((item) => {
          const currentTime = new Date();
          const status = item?.startDate > currentTime ? 'success' : 'default';

          return (
            <li key={item.id}>
              <Badge
                status={status}
                text={`${moment(item?.startDate).format('LT')} - ${item?.title}`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const handleOpenDetail = (data) => {
    console.log({ data });

    const time = data?.[0]?.startDate;

    return Modal.info({
      width: '40vw',
      title: `Lịch thi ngày ${moment(time).format('L')}`,
      content: (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item actions={[<a key="text-primary">Tham gia</a>]}>
              {moment(item?.startDate).format('LT')} - {item?.title}
            </List.Item>
          )}
        />
      ),
    });
  };

  return (
    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
  );
};

export default TeacherCalendar;
