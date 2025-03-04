import React, { FC, useCallback } from 'react';

import { Answer, QuizType, TranslationData } from '../../types';
import MultipleSelect from '../Select/MultipleSelect/MultipleSelect';
import SingleSelect from '../Select/SingleSelect/SingleSelect';

type Props = {
  quizData: TranslationData;
  handleSubmit: (answer: Answer[]) => void;
  storageAnswers: Answer[];
  type: QuizType;
};

const QuizQuestions: FC<Props> = ({
  handleSubmit,
  quizData,
  type,
  storageAnswers,
}) => {
  const { description, options, title } = quizData;

  const renderQuiz = useCallback(() => {
    switch (type) {
      case QuizType.SINGLE_SELECT:
      case QuizType.SINGLE_SELECT_IMAGE: {
        const showImage = type === QuizType.SINGLE_SELECT_IMAGE;
        return (
          <SingleSelect
            handleSubmit={handleSubmit}
            options={options}
            showImage={showImage}
            storageAnswers={storageAnswers}
          />
        );
      }
      case QuizType.MULTIPLE_SELECT:
        return (
          <MultipleSelect
            handleSubmit={handleSubmit}
            options={options}
            storageAnswers={storageAnswers}
            showCheckbox
          />
        );
      case QuizType.BUBBLE:
        return (
          <MultipleSelect
            handleSubmit={handleSubmit}
            options={options}
            storageAnswers={storageAnswers}
            maxSelectCount={3}
            buttonClassName='rounded-full size-[88px] [&>span:first-child]:text-2xl [&>span:last-child]:flex-none [&>span:last-child]:text-sm [&>span]:leading-3.5 p-2 justify-center items-center overflow-hidden flex-none gap-2.5 not-odd:translate-y-1/4'
            answerClassName='[&>div]:grid [&>div]:grid-cols-4 max-w-[400px] [&>div]:py-9 [&>div]:mx-auto [&>div]:place-items-center [&>div]:gap-2 [&>div]:min-w-[370px]'
            showImage
          />
        );

      default:
        return null;
    }
  }, [type, options, handleSubmit, storageAnswers]);

  return (
    <div className='flex h-full flex-col items-center gap-4'>
      <h2
        className='text-center'
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <h3 className='text-center'>{description}</h3>
      {renderQuiz()}
    </div>
  );
};

export default QuizQuestions;
