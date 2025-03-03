import { FC, lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import FinalPage from './pages/FinalPage/FinalPage';
import ProgressPage from './pages/ProgressPage/ProgressPage';
import QuizPage from './pages/QuizPage/QuizPage';
import {
  ProtectedEmailRoute,
  ProtectedFinalRoute,
  ProtectedProgressRoute,
  ProtectedQuizRoute,
} from './routes';

const EmailPage = lazy(() => import('./pages/EmailPage/EmailPage'));

const AppContainer: FC = () => {
  return (
    <div className='flex h-full flex-col'>
      <main className='container flex-1'>
        <Suspense fallback={<div>LOADER</div>}>
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
            <Route
              path='progress'
              element={<ProtectedProgressRoute />}
            >
              <Route
                index
                element={<ProgressPage />}
              />
            </Route>
            <Route
              path='email'
              element={<ProtectedEmailRoute />}
            >
              <Route
                index
                element={<EmailPage />}
              />
            </Route>
            <Route
              path='final'
              element={<ProtectedFinalRoute />}
            >
              <Route
                index
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
