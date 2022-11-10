import { DeletedFlag } from './system';

export type QuestionType = 'content' | 'multiple' | 'single';

export type QuestionLevelType = 0 | 1 | 2 | 3 | 4;

export interface GetQuestionRequest {
  id?: string;
  type?: QuestionType;
  level?: QuestionLevelType;
  point?: number;
  title?: string;
  content?: string;
  images?: string;
  deleted?: DeletedFlag;
}

export interface GetQuestionResponse {}

export interface GetFolderRequest {
  id?: string;
  name?: string;
  deleted?: DeletedFlag;
}
