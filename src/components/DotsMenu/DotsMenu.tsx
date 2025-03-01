import React, { FC } from 'react';

import Button from '../Button/Button';

const DotsMenu: FC = () => {
  return (
    <Button className='flex h-6 cursor-pointer items-center gap-1'>
      <span className='flex size-1 rounded-full bg-black' />
      <span className='flex size-1 rounded-full bg-black' />
      <span className='flex size-1 rounded-full bg-black' />
    </Button>
  );
};

export default DotsMenu;
