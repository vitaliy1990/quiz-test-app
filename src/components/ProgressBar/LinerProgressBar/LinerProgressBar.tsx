import React, { FC, memo } from 'react';

import { cn } from '../../../utils/style';

type Props = {
  progress: number | string;
  progressBarClassName?: string;
  progressThumbClassName?: string;
};

const LinerProgressBar: FC<Props> = memo(
  ({ progress, progressBarClassName = '', progressThumbClassName = '' }) => {
    return (
      <div
        className={cn(
          'flex h-1 w-full rounded-full bg-[#e8eaf2]',
          progressBarClassName
        )}
        role='progressbar'
      >
        <div
          className={cn(
            'flex h-1 rounded-full bg-[#e4229c] transition-all duration-300 ease-linear',
            progressThumbClassName
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
);

export default LinerProgressBar;
