import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import Button, { type ButtonProps } from './Button';

const IconButton = (
  props: Omit<ButtonProps, 'children'> & {
    icon: ComponentPropsWithoutRef<'img'>['src'];
    text: string;
  },
) => {
  const { className, icon, text, variant, ...restProps } = props;

  return (
    <Button
      className={clsx(
        `text-minimum flex flex-col items-center leading-2.5 ${variant !== 'outlined' && 'pt-0.5'}`,
        className,
      )}
      variant={variant}
      {...restProps}
    >
      <img src={icon} />
      {text}
    </Button>
  );
};

export default IconButton;
