import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

const commonStyles =
  'placeholder:text-black-30 w-full rounded-lg bg-white py-1.5 px-7.5 focus:border focus:outline-none';

const colorStyles = 'border-light-blue caret-light-blue';

const errorStyles =
  'border-pink-500 focus:border-pink-500 focus:outline-pink-500';

const TextField = (
  props: Omit<ComponentPropsWithoutRef<'input'>, 'children'> & {
    helperText?: string;
    error?: boolean;
    inputRef?: ComponentProps<'input'>['ref'];
  },
) => {
  const {
    className,
    helperText = '',
    error = false,
    inputRef,
    ...restProps
  } = props;
  return (
    <div>
      <input
        className={clsx(
          commonStyles,
          error ? errorStyles : colorStyles,
          className,
        )}
        aria-invalid={error}
        ref={inputRef}
        {...restProps}
      />
      <p
        className={`text-caption flex min-h-6 items-center ${error && 'text-pink-600'}`}
      >
        {helperText}
      </p>
    </div>
  );
};

export default TextField;
