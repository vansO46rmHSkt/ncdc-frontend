import done from '@/assets/done.svg';
import { type ComponentPropsWithoutRef } from 'react';
import IconButton from './ButtonWithIcon';

const DoneButton = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
) => {
  return <IconButton {...props} icon={done} text="Done" />;
};

export default DoneButton;
