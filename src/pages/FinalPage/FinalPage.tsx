import { FC, MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import download from '../../assets/images/download.svg';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import { CheckIcon } from '../../components/icons';
import { QUIZ_ANSWERS } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';
import { QuizAnswer } from '../../types';
import { exportToCsv } from '../../utils/download';

const FinalPage: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const answersData = useLocalStorage<QuizAnswer[]>(QUIZ_ANSWERS, []);
  const answers = answersData.get();

  const handleClickDownload = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    exportToCsv(answers);
  };

  const handleClickReset = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    window.localStorage.clear();
    navigate('/quiz/1');
  };

  return (
    <div className='flex h-full flex-col gap-8 text-[#ececfb]'>
      <Header />
      <div className='flex h-full flex-col items-center gap-4'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <h4>{t('thankYou')}</h4>
          <p className='mb-6 font-semibold'>{t('supporting')}</p>
          <div className='flex size-28 items-center justify-center rounded-full bg-amber-100'>
            <CheckIcon
              iconClassName='size-14'
              iconColor='green'
            />
          </div>
        </div>
        <div className='flex w-full flex-col items-center gap-4'>
          <Button
            onClick={handleClickDownload}
            className='flex items-center gap-2 font-semibold'
          >
            <img
              src={download}
              className='size-6'
              alt=''
            />
            {t('download')}
          </Button>
          <Button
            variant='primary'
            className='w-full max-w-[400px] rounded-3xl p-2.5 font-extrabold text-white hover:bg-[#e4229c]'
            onClick={handleClickReset}
          >
            {t('retake')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
