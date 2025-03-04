import React, { FC, MouseEvent } from 'react';

import { ButtonSize, ButtonType, ButtonVariant } from '../../types';
import { cn } from '../../utils/style';

type Props = {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
};

const Button: FC<Props> = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
  variant = 'transparent',
  size = 'default',
}) => {
  const variantClasses = {
    primary: 'bg-[#e4229c] text-white hover:bg-[#e4229c]/70',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-[#36173d] border-2 border-transparent rounded-2xl',
    transparent: 'bg-transparenr',
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    default: 'text-inherit',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded transition duration-300 focus:outline-none disabled:cursor-auto disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      aria-label='button'
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
