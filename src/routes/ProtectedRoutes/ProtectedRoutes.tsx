import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { QUIZ_STEPS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizSteps } from '../../types';

const ProtectedRoutes = () => {
  const steps = useLocalStorage<QuizSteps>(QUIZ_STEPS, QuizSteps.QUIZ).get();

  const { pathname } = useLocation();
  const currentPathName = pathname.slice(1);

  if (currentPathName !== steps) {
    return (
      <Navigate
        to={`/${steps}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
