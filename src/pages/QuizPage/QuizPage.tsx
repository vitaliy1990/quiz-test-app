import React, { FC, useCallback, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import QuizHeader from '../../components/QuizHeader/QuizHeader';
import QuizQuestions from '../../components/QuizQuestions/QuizQuestions';
import { QUIZ_ANSWERS } from '../../const';
import dataJSON from '../../data/quizzes.json';
import { useLanguage } from '../../hooks/useLanguage';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Answer, QuizAnswer, QuizData, QuizType } from '../../types';
import { updateQuizAnswers } from '../../utils/quiz';

const QuizPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const quizId = Number(id) || 1;
  const { data, quizCount } = dataJSON;

  const { language, setLanguage } = useLanguage();

  const storageQuizAnswers = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []);

  const quizData = useMemo(
    () => data.find((item) => item.quizId === quizId) as QuizData | undefined,
    [quizId]
  );

  const storageAnswers = useMemo(
    () =>
      storageQuizAnswers.get().find((item) => item.quizId === quizId)?.answer,
    [quizId, storageQuizAnswers]
  );

  const handleSubmit = useCallback(
    (answer: Answer[]) => {
      if (quizId === 1) {
        setLanguage(answer[0].id);
      }

      const title = quizData?.translations[language].title || '';
      const type = (quizData?.type || '') as QuizType;

      const quizAnswer: QuizAnswer = {
        quizId,
        title,
        type,
        answer,
      };

      updateQuizAnswers(quizAnswer, storageQuizAnswers);

      if (quizId === quizCount) {
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
        type={quizData.type}
        quizData={quizData.translations[language]}
        handleSubmit={handleSubmit}
        storageAnswers={storageAnswers || []}
      />
    </div>
  );
};

export default QuizPage;
