import { FC, lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import QuizPage from './pages/QuizPage/QuizPage';

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
              path='quiz/:id'
              element={<QuizPage />}
            />
            <Route
              path='email'
              element={<EmailPage />}
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
