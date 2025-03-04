import { FC, useCallback, useMemo } from 'react';

import { cn } from '../../utils/style';
import Button from '../Button/Button';
import { CheckIcon } from '../icons';

type Props = {
  handleSubmit: (label: string, id: string) => void;
  label: string;
  id: string;
  showImage?: boolean;
  image?: string;
  showCheckbox?: boolean;
  isActive?: boolean;
  buttonClassName?: string;
  labelClassName?: string;
};

const AnswerButton: FC<Props> = ({
  handleSubmit,
  showImage,
  label,
  image,
  id,
  isActive = false,
  showCheckbox = false,
  buttonClassName = '',
  labelClassName = '',
}) => {
  const rootClassName = useMemo(
    () =>
      cn(
        'w-full max-w-[400px] px-4 py-6 hover:border-[#e4229b]',
        {
          'flex max-w-32 flex-col rounded-xl px-6 py-8': showImage,
          'bg-[rgba(228,34,155,0.2)] border-[#e4229b]': isActive,
          'flex flex-row items-center gap-4 justify-center': showCheckbox,
        },
        buttonClassName
      ),
    [showImage, buttonClassName, showCheckbox, isActive]
  );

  const handleClick = () => {
    handleSubmit(label, id);
  };

  const renderCheckbox = useCallback(() => {
    if (!showCheckbox) {
      return null;
    }

    return (
      <div
        className={cn(
          'relative flex size-6 rounded-lg border border-[#e4229b] bg-[#6d4376]',
          {
            'bg-[#e4229b]': isActive,
          }
        )}
      >
        {isActive && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <CheckIcon />
          </div>
        )}
      </div>
    );
  }, [isActive, showCheckbox]);

  return (
    <Button
      variant='ghost'
      onClick={handleClick}
      className={rootClassName}
    >
      {image && showImage && (
        <span
          role='img'
          aria-label='crown'
          className='text-[52px]'
        >
          {image}
        </span>
      )}
      <span className={cn('line-clamp-3 flex-1', labelClassName)}>{label}</span>
      {renderCheckbox()}
    </Button>
  );
};

export default AnswerButton;
