import { Navigate, Outlet, useParams } from 'react-router-dom';

import { QUIZ_ANSWERS, QUIZ_STEPS } from '../../const';
import dataJSON from '../../data/quizzes.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer, QuizSteps } from '../../types';
import { getNextQuizId } from '../../utils/navigation';

const ProtectedQuizRoute = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { quizCount } = dataJSON;

  const steps = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz').get();
  const answeredQuiz = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []).get();

  if (steps === 'final') {
    return (
      <Navigate
        to='/final'
        replace
      />
    );
  }

  const lastQuizId = answeredQuiz[answeredQuiz.length - 1]?.quizId;

  if (!lastQuizId && quizId !== 1) {
    return (
      <Navigate
        to='quiz/1'
        replace
      />
    );
  }

  const isValidQuizId = quizId <= quizCount && quizId !== 0;
  const nextQuizId = getNextQuizId(answeredQuiz, quizId, quizCount);

  if (!isValidQuizId || quizId > nextQuizId) {
    const navigationLink = `/quiz/${nextQuizId}`;

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
