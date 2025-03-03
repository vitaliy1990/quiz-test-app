import { FC, memo } from 'react';

import { cn } from '../../../utils/style';

type Props = {
  strokeWidth?: number;
  sqSize?: number;
  percentage: number;
  progressClassName?: string;
  trackClassName?: string;
  labelClassName?: string;
};

const CircularProgressBar: FC<Props> = memo((props) => {
  const {
    strokeWidth = 12,
    sqSize = 252,
    percentage = 34,
    progressClassName = '',
    trackClassName = '',
    labelClassName = '',
  } = props;

  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;
  const statusMessage = `${percentage}%`;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
    >
      <circle
        className={cn('fill-none stroke-[#E8EAF2]', trackClassName)}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        fill='transparent'
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={cn(
          'fill-none stroke-[#E4229C] transition-all ease-in',
          progressClassName
        )}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap='round'
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        x='50%'
        y='50%'
        dy='.3em'
        textAnchor='middle'
        fill='#fff'
        className={cn('text-[52px] font-extrabold', labelClassName)}
      >
        {statusMessage}
      </text>
    </svg>
  );
});

export default CircularProgressBar;
