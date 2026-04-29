import deleteIcon from '@/assets/delete.svg';
import type { ComponentPropsWithoutRef } from 'react';

const DeleteIconButton = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
) => {
  const { disabled, ...restProps } = props;
  return (
    <div className={`${disabled && 'bg-white opacity-30'}`}>
      <button
        title="削除"
        className="cursor-pointer rounded hover:bg-[#E6E6E6] active:bg-[#CCCCCC] disabled:cursor-not-allowed"
        disabled={disabled}
        {...restProps}
      >
        <img src={deleteIcon} />
      </button>
    </div>
  );
};

export default DeleteIconButton;
