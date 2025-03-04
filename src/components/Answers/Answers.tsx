import React, { FC } from 'react';

import { Answer, QuizOption } from '../../types';
import { cn } from '../../utils/style';
import AnswerButton from '../AnswerButton/AnswerButton';

type Props = {
  handleClick: (label: string, id: string) => void;
  options: QuizOption[];
  answers: Answer[];
  showImage?: boolean;
  showCheckbox?: boolean;
  buttonClassName?: string;
};

const Answers: FC<Props> = ({
  options,
  answers,
  handleClick,
  showImage = false,
  showCheckbox = false,
  buttonClassName = '',
}) => {
  const renderAnswers = () =>
    options.map((option) => {
      const isActive = answers.find((item) => item.id === option.id);

      return (
        <AnswerButton
          key={option.id}
          handleSubmit={handleClick}
          showImage={showImage}
          isActive={!!isActive}
          buttonClassName={buttonClassName}
          showCheckbox={showCheckbox}
          {...option}
        />
      );
    });
  return (
    <div
      className={cn('flex w-full flex-col items-center justify-center gap-3', {
        'flex-row flex-wrap items-stretch': showImage,
      })}
    >
      {renderAnswers()}
    </div>
  );
};

export default Answers;
