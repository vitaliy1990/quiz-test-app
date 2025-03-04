import React, { FC } from 'react';

type Props = {
  iconClassName?: string;
  iconColor?: string;
};

const CheckIcon: FC<Props> = ({ iconClassName = '', iconColor = 'white' }) => {
  return (
    <svg
      width='12'
      height='9'
      viewBox='0 0 12 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={iconClassName}
    >
      <path
        d='M10.984 0.284764C10.6055 -0.0941626 9.94368 -0.0955271 9.56384 0.284309L3.6516 6.19747L1.71216 4.25848C1.33369 3.88047 0.67364 3.87865 0.292439 4.25848C-0.0976313 4.65038 -0.0976313 5.28677 0.293349 5.67775L2.94447 8.32933C3.13552 8.51674 3.38685 8.62023 3.6516 8.62023C3.91998 8.62023 4.17177 8.51583 4.35964 8.32705L10.9831 1.70358C11.1723 1.51434 11.2772 1.2621 11.2772 0.994171C11.2772 0.725783 11.1723 0.473999 10.984 0.284764Z'
        fill={iconColor}
      />
    </svg>
  );
};

export default CheckIcon;
