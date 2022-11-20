import qs from 'query-string';
import fetcher from '@util/fetcher';
import { Client } from '@util/apis';
import { BaseResponse } from '@schema/system';
import { GetExamRequest, ExamResponse, GetExamDetailResponse } from './types';
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
}

const examService = new Exam();

export { examService };
