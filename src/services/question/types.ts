import { DeleteFlagTypes, LevelTypes, QuestionTypes } from '@util/constant';

export type FolderResponse = {
  id: string;
  name: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export type QuestionResponse = {
  id: string;
  type: QuestionTypes;
  level: LevelTypes;
  point: number;
  title: string;
  content: string;
  images?: string;
  folder_id: string;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

export type AnswerResponse = {
  id: string;
  content: string;
  question_id: string;
  percent: number;
  created_date: string;
  created_id: string;
  updated_date: string;
  updated_id: string;
  deleted: DeleteFlagTypes;
};

interface ParentNode extends FolderResponse {
  tb_questions: QuestionResponse[];
}

export interface GetQuestionDetailResponse extends QuestionResponse {
  tb_question_folder: FolderResponse;
  tb_answers: AnswerResponse[];
}

export interface GetTreeResponse {
  parents: ParentNode[];
  aloneLeafs: QuestionResponse[];
}

export interface GetFolderRequest {
  id?: string;
  created_id?: string;
}

export interface GetFolderResponse extends FolderResponse {}

export interface NewFolderRequest {
  name: string;
}

export interface UpdateFolderRequest {
  id: string;
  name?: string;
  deleted?: DeleteFlagTypes;
}

export interface NewQuestionRequest {
  type: QuestionTypes;
  level: LevelTypes;
  point: number;
  title: string;
  content: string;
  images?: string;
  folder_id?: string;
  answer: Array<{
    content: string;
    percent: number;
  }>;
}

export interface UpdateQuestionRequest {
  id: string;
  type?: QuestionTypes;
  level?: LevelTypes;
  point?: number;
  title?: string;
  content?: string;
  images?: string;
  deleted?: DeleteFlagTypes;
}
