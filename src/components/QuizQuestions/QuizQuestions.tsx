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
            buttonClassName='rounded-full size-[88px] [&>span:first-child]:text-2xl [&>span:last-child]:flex-none [&>span:last-child]:text-sm p-2 justify-center items-center overflow-hidden flex-none not-odd:translate-y-[110%] odd:translate-x-[100%]'
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
      <h3 className='size- text-center'>{description}</h3>
      {renderQuiz()}
    </div>
  );
};

export default QuizQuestions;
