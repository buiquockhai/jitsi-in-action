import { GetQuestionDetailResponse } from '@service/question/types';
import { DeleteFlagTypes, LevelTypes } from '@util/constant';

export interface GetExamRequest {
  status?: boolean;
  created_id?: string;
}

export type ExamResponse = {
  id: string;
  max_point: string;
  duration: number;
  level: LevelTypes;
  status: boolean;
  title: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export interface GetExamDetailResponse {
  exam: ExamResponse;
  questionList: GetQuestionDetailResponse[];
}
