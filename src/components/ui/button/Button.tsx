import clsx from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

const commonStyles =
  'cursor-pointer rounded font-bold h-full w-full disabled:cursor-not-allowed';

const vairantStyles = {
  primary: 'bg-light-blue text-white hover:bg-[#3C8EC4] active:bg-[#347CAB]',
  secondary: 'bg-black-30 text-white hover:bg-[#999999] active:bg-[#808080]',
  outlined:
    'bg-white text-light-blue hover:bg-[#CCCCCC] active:bg-[#B3B3B3] border-light-blue border-2',
} as const;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof vairantStyles;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    variant = 'primary',
    children,
    disabled,
    ...restProps
  } = props;

  return (
    <div
      className={`h-10 w-22.5 min-w-10 ${disabled && 'bg-white opacity-30'}`}
    >
      <button
        className={clsx(commonStyles, vairantStyles[variant], className)}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
