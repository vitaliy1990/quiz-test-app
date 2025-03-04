import { FC, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';
import DotsMenu from '../DotsMenu/DotsMenu';
import { ArrowIcon } from '../icons';
import LinerProgressBar from '../ProgressBar/LinerProgressBar/LinerProgressBar';

type Props = {
  quizId: number;
};

const QuizHeader: FC<Props> = ({ quizId }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    const prevStep = quizId - 1;
    navigate(`/quiz/${prevStep}`);
  };

  const progress = useMemo(() => (quizId * 100) / 5, [quizId]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-4'>
        <Button
          className='size-6 disabled:opacity-0'
          disabled={quizId === 1}
          onClick={handleBackClick}
        >
          <ArrowIcon />
        </Button>
        <div className='flex items-center text-lg font-extrabold text-[#e8eaf2]'>
          <span className='text-[#e4229c]'>{quizId}</span>
          <span className='font-medium'>/</span>
          <span>5</span>
        </div>
        <DotsMenu onClick={() => {}} />
      </div>
      <LinerProgressBar progress={progress} />
    </div>
  );
};

export default QuizHeader;
