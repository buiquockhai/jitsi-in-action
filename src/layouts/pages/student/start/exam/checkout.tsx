import { ROOMING_EXAMS_MOCK } from '@mock/rooming-exams';
import React, { useCallback } from 'react';
import classNames from 'classnames';

const QUESTIONS = ROOMING_EXAMS_MOCK.questions;

const CheckoutResult: React.FC<{
  index: number;
  onChangeQuestion: (ques: number) => void;
}> = ({ index, onChangeQuestion }) => {
  const CameraFrame = useCallback(() => {
    return <div className="w-full pb-[50%] relative bg-red-50"></div>;
  }, []);

  const CheckoutList = useCallback(() => {
    return (
      <div className="w-full grid grid-cols-6 gap-2">
        {QUESTIONS?.map((_, idx) => (
          <button
            onClick={onChangeQuestion.bind(null, idx)}
            className={classNames(
              'w-full flex items-center justify-center border rounded-sm',
              {
                'border-2 border-blue-700': index == idx,
              }
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    );
  }, [index]);

  return (
    <div className="w-full flex flex-col gap-5">
      <CameraFrame />
      <CheckoutList />
    </div>
  );
};

export default CheckoutResult;
