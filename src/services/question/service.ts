import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import {
  GetFolderRequest,
  GetFolderResponse,
  GetQuestionDetailResponse,
  GetQuestionRequest,
  GetQuestionResponse,
  GetTreeResponse,
  NewFolderRequest,
  NewQuestionRequest,
  UpdateFolderRequest,
  UpdateQuestionRequest,
} from './types';
import { uuidVerify } from '@util/functions';

class Question extends Client {
  public getTree() {
    return fetcher<BaseResponse<GetTreeResponse>>(
      `${this.baseUrl}/v1/question/tree`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getQuestionDetail(id: string) {
    return fetcher<BaseResponse<GetQuestionDetailResponse>>(
      `${this.baseUrl}/v1/question/${id}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getFolder(req: GetFolderRequest) {
    return fetcher<BaseResponse<GetFolderResponse[]>>(
      `${this.baseUrl}/v1/question/folder?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getQuestion(req: GetQuestionRequest) {
    return fetcher<BaseResponse<GetQuestionResponse[]>>(
      `${this.baseUrl}/v1/question?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newFolder(req: NewFolderRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/question/folder`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public newQuestion(req: NewQuestionRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/question`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateFolder(req: UpdateFolderRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/question/folder`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }

  public updateQuestion(req: UpdateQuestionRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/question`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const questionService = new Question();

export { questionService };
