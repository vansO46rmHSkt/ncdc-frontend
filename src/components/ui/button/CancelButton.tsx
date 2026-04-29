import cancel from '@/assets/cancel.svg';
import { type ComponentPropsWithoutRef } from 'react';
import IconButton from './ButtonWithIcon';

const CancelButton = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
) => {
  return (
    <IconButton {...props} icon={cancel} text="Cancel" variant="secondary" />
  );
};

export default CancelButton;
