import React, { FC, useEffect, useState } from 'react';

import { Answer, QuizOption } from '../../../types';
import { createQuizAnswers } from '../../../utils/quiz';
import Answers from '../../Answers/Answers';
import Button from '../../Button/Button';

type Props = {
  handleSubmit: (answer: Answer[]) => void;
  options: QuizOption[];
  storageAnswers: Answer[];
  showImage?: boolean;
  maxSelectCount?: number;
  showCheckbox?: boolean;
  buttonClassName?: string;
};

const MultipleSelect: FC<Props> = ({
  handleSubmit,
  options,
  storageAnswers,
  showImage = false,
  maxSelectCount,
  showCheckbox,
  buttonClassName = '',
}) => {
  const [answers, setAnswers] = useState<Answer[]>(storageAnswers);

  useEffect(() => {
    setAnswers(storageAnswers);
  }, [storageAnswers]);

  const handleClick = (label: string, id: string) => {
    const toggleAnswer = answers.some((item) => item.id === id);

    if (toggleAnswer) {
      return setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== id)
      );
    }

    if (maxSelectCount && answers.length >= maxSelectCount) {
      return;
    }

    const newAnswer = createQuizAnswers(label, id);
    setAnswers([...answers, newAnswer]);
  };

  const onSubmit = () => {
    handleSubmit(answers);
    setAnswers([]);
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-6'>
      <Answers
        handleClick={handleClick}
        options={options}
        answers={answers}
        showCheckbox={showCheckbox}
        showImage={showImage}
        buttonClassName={buttonClassName}
      />
      <Button
        variant='primary'
        onClick={onSubmit}
        className='w-full max-w-[400px] rounded-3xl p-2.5 font-extrabold hover:bg-[#e4229c]'
        disabled={!answers.length}
      >
        Next
      </Button>
    </div>
  );
};

export default MultipleSelect;
