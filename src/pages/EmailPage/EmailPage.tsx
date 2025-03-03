import { ChangeEvent, useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { QUIZ_ANSWERS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer, QuizType } from '../../types';
import { updateQuizAnswers } from '../../utils/quiz';
import { cn } from '../../utils/style';
import { checkIsEmailValid } from '../../utils/validations';

const EmailPage = () => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const navigate = useNavigate();

  //const emailStore = useLocalStorage<QuizAnswer>(QUIZ_EMAIL);
  const storageQuizAnswers = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS);

  const handleBlur = () => {
    const isValid = checkIsEmailValid(value);

    if (isValid) {
      setIsValidEmail(true);
      setError(null);
      return;
    }

    setError('Please enter a valid email address!');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const value = e.target.value;
    const isValid = checkIsEmailValid(value);

    if (isValid) {
      setIsValidEmail(true);
    }
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const quizAnswer = {
      quizId: 6,
      title: 'Enter your email to get full access',
      type: 'email' as QuizType,
      answer: [{ id: 'email', options: value }],
    };
    updateQuizAnswers(quizAnswer, storageQuizAnswers);
    navigate('/final');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
      <Header />
      <div className='flex w-full flex-col items-center'>
        <h2>Email</h2>
        <h3>Enter your email to get full access</h3>
      </div>
      <div className='flex h-full w-full max-w-[400px] flex-col justify-between gap-6'>
        <div className='flex flex-col items-center gap-8'>
          <div className='relative w-full'>
            <input
              type='email'
              className={cn(
                'w-full rounded-2xl border-2 border-[#36173d] bg-[#36173d] px-2 py-4 font-medium placeholder:text-[17px] placeholder:text-[rgba(196,200,204,0.5)] focus:border-transparent focus-visible:border-transparent',
                { 'border-red-600': error }
              )}
              placeholder='Your email'
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {error && <p className='absolute text-sm text-red-600'>{error}</p>}
          </div>
          <p className='text-center text-[12px] font-medium text-[var(--secondary-color)]'>
            By continuing I agree with{' '}
            <NavLink
              to='/'
              className='text-[#eb2f9a]'
            >
              Privacy policy
            </NavLink>{' '}
            and{' '}
            <NavLink
              to='/'
              className='text-[#eb2f9a]'
            >
              Terms of use.
            </NavLink>
          </p>
        </div>
        <Button
          variant='primary'
          className='w-full rounded-3xl p-2.5 font-extrabold hover:bg-[#e4229c]'
          disabled={!isValidEmail || !!error}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmailPage;
