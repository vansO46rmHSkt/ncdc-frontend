import clsx from 'clsx';
import type { ComponentProps, ComponentPropsWithoutRef } from 'react';

const commonStyles =
  'placeholder:text-black-30 w-full rounded-lg bg-white p-7.5 focus:border focus:outline-none';

const colorStyles = 'border-light-blue caret-light-blue';

const errorStyles =
  'border-pink-500 focus:border-pink-500 focus:outline-pink-500';

const Textarea = (
  props: ComponentPropsWithoutRef<'textarea'> & {
    helperText?: string;
    error?: boolean;
    inputRef?: ComponentProps<'textarea'>['ref'];
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
    <>
      <textarea
        className={clsx(
          commonStyles,
          error ? errorStyles : colorStyles,
          className,
        )}
        aria-invalid={error}
        ref={inputRef}
        {...restProps}
      />
      {helperText && (
        <p className={`text-caption mx-7.5 mt-1 ${error && 'text-pink-600'}`}>
          {helperText}
        </p>
      )}
    </>
  );
};

export default Textarea;
