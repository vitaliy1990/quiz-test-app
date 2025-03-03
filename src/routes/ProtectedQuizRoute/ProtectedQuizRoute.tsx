import { Navigate, Outlet, useParams } from 'react-router-dom';

import { QUIZ_ANSWERS, QUIZ_STEPS } from '../../const';
import dataJSON from '../../data/quizzes.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer, QuizSteps } from '../../types';

const ProtectedQuizRoute = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { data } = dataJSON;

  const answersStorage = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []);
  const stepsStorage = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz');

  const answeredQuiz = answersStorage.get();
  const steps = stepsStorage.get();

  if (steps === 'final') {
    return (
      <Navigate
        to='/final'
        replace
      />
    );
  }

  const isValidQuizId = data.some((item) => item.quizId === quizId);

  const lastQuizId = answeredQuiz[answeredQuiz.length - 1]?.quizId || 0;
  const isValidQuizStep = +quizId <= lastQuizId + 1;
  const isAllowed = isValidQuizId && isValidQuizStep;

  if (!isAllowed) {
    const isActualLastQuizId = lastQuizId === 1 || !isValidQuizId;
    const currentId = isActualLastQuizId ? lastQuizId : lastQuizId + 1;
    const navigationLink = `/quiz/${currentId}`;

    return (
      <Navigate
        to={navigationLink}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedQuizRoute;
