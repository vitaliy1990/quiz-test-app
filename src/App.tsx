import { FC, lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import ProgressPage from './pages/ProgressPage/ProgressPage';
import QuizPage from './pages/QuizPage/QuizPage';
import { ProtectedQuizRoute, ProtectedRoutes } from './routes';

const FinalPage = lazy(() => import('./pages/FinalPage/FinalPage'));
const EmailPage = lazy(() => import('./pages/EmailPage/EmailPage'));

const AppContainer: FC = () => {
  return (
    <div className='flex h-full flex-col'>
      <main className='container flex-1'>
        <Suspense fallback={<Loader size='large' />}>
          <Routes>
            <Route
              path='/'
              element={
                <Navigate
                  to='/quiz/1'
                  replace
                />
              }
            />
            <Route
              path='/quiz'
              element={<ProtectedQuizRoute />}
            >
              <Route
                path=':id'
                element={<QuizPage />}
              />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route
                path='progress'
                element={<ProgressPage />}
              />

              <Route
                path='email'
                element={<EmailPage />}
              />

              <Route
                path='final'
                element={<FinalPage />}
              />
            </Route>

            <Route
              path='*'
              element={
                <Navigate
                  to='/quiz/1'
                  replace
                />
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  );
};

export default App;
