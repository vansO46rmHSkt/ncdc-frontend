import add from '@/assets/+.svg';
import { type ComponentPropsWithoutRef } from 'react';
import IconButton from './ButtonWithIcon';

const NewPageButton = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
) => {
  return (
    <IconButton {...props} icon={add} text="New Page" variant="outlined" />
  );
};

export default NewPageButton;
