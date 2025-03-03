import { Navigate, Outlet } from 'react-router-dom';

import { QUIZ_STEPS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizSteps } from '../../types';

const ProtectedEmailRoute = () => {
  const stepsStorage = useLocalStorage<QuizSteps>(QUIZ_STEPS, 'quiz');
  const steps = stepsStorage.get();

  if (steps !== 'email') {
    return (
      <Navigate
        to={`/${steps}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedEmailRoute;
