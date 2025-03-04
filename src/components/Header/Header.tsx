import { FC } from 'react';

import { cn } from '../../utils/style';
import DotsMenu from '../DotsMenu/DotsMenu';

type Props = {
  rootClassName?: string;
  menuClassName?: string;
};

const Header: FC<Props> = ({ rootClassName = '', menuClassName = '' }) => {
  return (
    <div className={cn('flex w-full justify-end', rootClassName)}>
      <DotsMenu
        onClick={() => {}}
        rootClassName={cn('size-6', menuClassName)}
      />
    </div>
  );
};

export default Header;
