import React, { FC } from 'react';

type Props = {
  iconClassName?: string;
};

const ArrowIcon: FC<Props> = ({ iconClassName = '' }) => {
  return (
    <svg
      width='11'
      height='16'
      viewBox='0 0 11 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={iconClassName}
    >
      <path
        d='M9 1.5L2.5 8L9 14.5'
        stroke='white'
        strokeWidth='2.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ArrowIcon;
