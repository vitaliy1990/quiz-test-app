import { FC } from 'react';

import { cn } from '../../utils/style';
import Button from '../Button/Button';

type Props = {
  onClick: () => void;
  rootClassName?: string;
};

const DotsMenu: FC<Props> = ({ onClick, rootClassName = '' }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'flex h-6 cursor-pointer items-center gap-1',
        rootClassName
      )}
    >
      <span className='flex size-1 rounded-full bg-black' />
      <span className='flex size-1 rounded-full bg-black' />
      <span className='flex size-1 rounded-full bg-black' />
    </Button>
  );
};

export default DotsMenu;
