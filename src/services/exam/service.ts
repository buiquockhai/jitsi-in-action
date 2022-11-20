import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import {
  GetExamRequest,
  ExamResponse,
  GetExamDetailResponse,
  NewExamRequest,
  UpdateExamRequest,
} from './types';
import { uuidVerify } from '@util/functions';

class Exam extends Client {
  public getExams(req: GetExamRequest) {
    return fetcher<BaseResponse<ExamResponse[]>>(
      `${this.baseUrl}/v1/exam?${qs.stringify(uuidVerify(req))}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public getExamDetail(id: string) {
    return fetcher<BaseResponse<GetExamDetailResponse>>(
      `${this.baseUrl}/v1/exam/${id}`,
      {
        headers: this.privateHeaders,
      }
    );
  }

  public newExam(req: NewExamRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/exam`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  public updateExam(req: UpdateExamRequest) {
    return fetcher<BaseResponse<any>>(`${this.baseUrl}/v1/exam`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(req),
    });
  }
}

const examService = new Exam();

export { examService };
