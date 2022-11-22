import { useState } from 'react';
import CheckoutResult from './checkout';
import Playground from './playground';

const ExamPane = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  return (
    <div className="w-full grid grid-cols-4 gap-3 h-[80vh]">
      <Playground index={currentQuestion} onChangeQuestion={setCurrentQuestion} />
      <CheckoutResult
        index={currentQuestion}
        onChangeQuestion={setCurrentQuestion}
      />
    </div>
  );
};

export default ExamPane;
