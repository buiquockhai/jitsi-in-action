import { ROOMING_EXAMS_MOCK } from '@mock/rooming-exams';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import Question from './question';

const QUESTIONS = ROOMING_EXAMS_MOCK.questions;

const Playground: React.FC<{
  index: number;
  onChangeQuestion: (ques: number) => void;
}> = ({ index, onChangeQuestion }) => {
  const questionDetail = useMemo(() => QUESTIONS?.[index], [index]);

  return (
    <div className="w-full col-span-3 min-h-full flex flex-col gap-5">
      <Question
        index={index}
        title={questionDetail?.title}
        point={questionDetail?.point}
        questionContent={questionDetail?.questionContent}
        questionImages={questionDetail?.questionImages}
        answers={questionDetail?.answers}
      />

      <div className="flex w-full items-center justify-center gap-3">
        <Button
          size="small"
          disabled={index <= 0}
          onClick={onChangeQuestion.bind(null, index - 1)}
        >
          Quay lại
        </Button>
        <span>
          {index + 1} / {QUESTIONS.length}
        </span>
        <Button
          size="small"
          disabled={index >= QUESTIONS.length - 1}
          onClick={onChangeQuestion.bind(null, index + 1)}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default Playground;
