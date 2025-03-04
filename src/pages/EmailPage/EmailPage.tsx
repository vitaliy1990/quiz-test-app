import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EmailForm from '../../components/Forms/EmailForm/EmailForm';
import Header from '../../components/Header/Header';
import { QUIZ_ANSWERS, QUIZ_STEPS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer, QuizSteps, QuizType } from '../../types';
import { updateQuizAnswers } from '../../utils/quiz';

const EmailPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const storageQuizAnswers = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS);
  const stepsStorage = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz');

  const handleSubmit = (value: string) => {
    const quizAnswer = {
      quizId: 6,
      title: t('description'),
      type: 'email' as QuizType,
      answer: [{ id: 'email', options: value }],
    };
    updateQuizAnswers(quizAnswer, storageQuizAnswers);

    stepsStorage.set('final');
    navigate('/final');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
      <Header />
      <div className='flex w-full flex-col items-center'>
        <h2>{t('title')}</h2>
        <h3>{t('description')}</h3>
      </div>
      <EmailForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default EmailPage;
