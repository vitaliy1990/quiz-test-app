import { FC } from 'react';

import { Answer, QuizOption } from '../../../types';
import { createQuizAnswers } from '../../../utils/quiz';
import Answers from '../../Answers/Answers';

type Props = {
  handleSubmit: (answer: Answer[]) => void;
  options: QuizOption[];
  storageAnswers: Answer[];
  showImage?: boolean;
};

const SingleSelect: FC<Props> = ({
  handleSubmit,
  options,
  storageAnswers,
  showImage = false,
}) => {
  const handleClick = (label: string, id: string) => {
    const answer = createQuizAnswers(label, id);
    handleSubmit([answer]);
  };

  return (
    <Answers
      handleClick={handleClick}
      options={options}
      answers={storageAnswers}
      showImage={showImage}
    />
  );
};

export default SingleSelect;
