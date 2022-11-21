import { GetQuestionDetailResponse } from '@service/question/types';
import { GetUserDetailResponse } from '@service/user/types';
import { DeleteFlagTypes } from '@util/constant';

export type ResultResponse = {
  id: string;
  room_id: string;
  selected_answer_id: string;
  selected_answer_label: string;
  question_id: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetResultResponse extends ResultResponse {
  tb_question: GetQuestionDetailResponse;
  tb_user: GetUserDetailResponse;
}
