import { __token } from '@util/constant';
import { getCookie } from '@util/functions';
import { userService } from '@service/user/service';
import { configurationService } from '@service/configuration/service';
import { questionService } from '@service/question/service';
import { examService } from '@service/exam/service';
import { groupService } from '@service/group/service';
import { roomService } from '@service/room/service';
import { notificationService } from '@service/notification/service';
import { resultService } from '@service/result/service';

const services = [
  userService,
  configurationService,
  questionService,
  examService,
  groupService,
  roomService,
  notificationService,
  resultService,
];

const dispatch = {
  setAuthToken: (token: string) => {
    services.forEach((service) => service.setAuthToken(token));
  },
  clearAuthToken: () => {
    services.forEach((service) => service.clearAuthToken());
  },
};

if (typeof window !== 'undefined') {
  const token = getCookie(__token, document.cookie);
  if (token) {
    dispatch.setAuthToken(token);
  }

  window.addEventListener('storage', (event) => {
    const { key, newValue } = event;
    if (key === __token && newValue) {
      dispatch.setAuthToken(newValue);
    }
  });
}

export {
  userService,
  configurationService,
  questionService,
  examService,
  groupService,
  roomService,
  notificationService,
  resultService,
};
