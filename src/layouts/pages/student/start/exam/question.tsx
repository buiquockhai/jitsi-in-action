import { ANPHABET } from '@util/constant';
import React from 'react';

export interface QuestionProps {
  index: number;
  title: string;
  point: number;
  questionContent: string;
  questionImages: string[];
  answers: Array<{
    id: string;
    content: string;
  }>;
}

const Question: React.FC<QuestionProps> = (props) => {
  return (
    <div className="w-full flex flex-col flex-auto gap-2">
      <p className="font-semibold">
        Câu {props?.index + 1}: {props?.point} điểm
      </p>
      <p>{props?.questionContent}</p>

      <div className="w-full grid grid-cols-2 gap-3 mt-5">
        {props?.answers?.map((item, index) => {
          return (
            <div
              key={item?.id}
              className="px-4 py-1 border rounded-sm border-dashed cursor-pointer"
              //   style={
              //     true ? { borderColor: '#52c41a', backgroundColor: '#f0fdf4' } : {}
              //   }
            >
              <span className="font-semibold">{ANPHABET?.[index]}.</span>{' '}
              {item?.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
