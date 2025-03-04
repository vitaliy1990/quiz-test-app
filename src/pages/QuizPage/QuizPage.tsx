import { FC, useCallback, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizQuestions from '../../components/QuizQuestions/QuizQuestions';
import { QUIZ_ANSWERS, QUIZ_STEPS } from '../../const';
import dataJSON from '../../data/quizzes.json';
import { useLanguage } from '../../hooks/useLanguage';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  Answer,
  QuizAnswer,
  QuizData,
  QuizSteps,
  Translations,
} from '../../types';
import { createQuizAnswerData, updateQuizAnswers } from '../../utils/quiz';

const QuizPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id) || 1;

  const navigate = useNavigate();

  const { language, setLanguage } = useLanguage();

  const storageQuizAnswers = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []);
  const stepsStorage = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz');

  const { data, quizCount } = dataJSON;

  const quizData = useMemo(
    () => data.find((item) => item.quizId === quizId) || data[0],
    [quizId, data]
  );

  const { translations, type } = quizData as QuizData;

  const storageAnswers = useMemo(
    () =>
      storageQuizAnswers.get().find((item) => item.quizId === quizId)?.answer,
    [quizId, storageQuizAnswers]
  );

  const handleSubmit = useCallback(
    (answer: Answer[]) => {
      if (quizId === 1) {
        const lng = answer[0].id as Translations;
        setLanguage(lng);
      }

      const quizAnswer = createQuizAnswerData(quizData as QuizData, answer);
      updateQuizAnswers(quizAnswer, storageQuizAnswers);

      if (quizId === quizCount) {
        stepsStorage.set('progress');
        return navigate('/progress');
      }

      navigate(`/quiz/${quizId + 1}`);
    },
    [quizId, navigate, storageQuizAnswers, quizCount, setLanguage]
  );

  if (!quizData) return null;

  return (
    <div className='flex h-full flex-col gap-8'>
      <QuizHeader quizId={quizId} />
      <QuizQuestions
        type={type}
        quizData={translations[language]}
        handleSubmit={handleSubmit}
        storageAnswers={storageAnswers || []}
      />
    </div>
  );
};

export default QuizPage;
