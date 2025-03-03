import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import CircularProgressBar from '../../components/ProgressBar/CircularProgressBar/CircularProgressBar';

const ProgressPage = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const navigate = useNavigate();
  const intervalRef = useRef<null | number>(null);

  useEffect(() => {
    if (percentage >= 100) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      requestAnimationFrame(() => {
        navigate('/email');
      });

      return;
    }

    intervalRef.current = setInterval(() => {
      setPercentage((prev) => Math.min(prev + 10 / 5, 100));
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [percentage]);

  return (
    <div className='flex h-full flex-col gap-6'>
      <Header />
      <div className='flex h-full flex-col items-center justify-center gap-8'>
        <CircularProgressBar percentage={percentage} />
        <p className='font-bold'>Finding collections for you...</p>
      </div>
    </div>
  );
};

export default ProgressPage;
