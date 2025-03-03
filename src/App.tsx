import { FC, lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import FinalPage from './pages/FinalPage/FinalPage';
import ProgressPage from './pages/ProgressPage/ProgressPage';
import QuizPage from './pages/QuizPage/QuizPage';
import { QuizProtectedRoute } from './routes';

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
              element={<QuizProtectedRoute />}
            >
              <Route
                path=':id'
                element={<QuizPage />}
              />
            </Route>

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
