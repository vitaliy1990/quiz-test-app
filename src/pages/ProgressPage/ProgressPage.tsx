import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import CircularProgressBar from '../../components/ProgressBar/CircularProgressBar/CircularProgressBar';
import { QUIZ_STEPS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizSteps } from '../../types';

const ProgressPage = () => {
  const [percentage, setPercentage] = useState<number>(0);

  const navigate = useNavigate();

  const intervalRef = useRef<null | number>(null);

  const stepsStorage = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz');

  const { t } = useTranslation();

  useEffect(() => {
    if (percentage >= 100) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      requestAnimationFrame(() => {
        stepsStorage.set('email');
        navigate('/email');
      });

      return;
    }

    intervalRef.current = setInterval(() => {
      setPercentage((prev) => Math.min(prev + 10 / 5, 100));
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [percentage]);

  return (
    <div className='flex h-full flex-col gap-6'>
      <Header />
      <div className='flex h-full flex-col items-center justify-center gap-8'>
        <CircularProgressBar percentage={percentage} />
        <p className='font-bold'>{t('progressCompiling')}</p>
      </div>
    </div>
  );
};

export default ProgressPage;
