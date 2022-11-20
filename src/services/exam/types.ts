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

export interface NewExamRequest {
  max_point: number;
  duration: number;
  level: number;
  status: boolean;
  title: string;
  questions: string[];
}
export interface UpdateExamRequest {
  id: string;
  max_point?: number;
  duration?: number;
  level?: number;
  status?: boolean;
  title?: string;
  deleted?: DeleteFlagTypes;
  questions?: string[];
}
