import { Navigate, Outlet, useParams } from 'react-router-dom';

import { QUIZ_ANSWERS } from '../../const';
import dataJSON from '../../data/quizzes.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer } from '../../types';

const QuizProtectedRoute = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { data } = dataJSON;

  const answersStorage = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []);
  const answeredQuiz = answersStorage.get();

  const isValidQuizId = data.some((item) => item.quizId === quizId);

  const lastQuizId = answeredQuiz[answeredQuiz.length - 1]?.quizId || 0;
  const isValidQuizStep = quizId <= lastQuizId + 1;
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

export default QuizProtectedRoute;
