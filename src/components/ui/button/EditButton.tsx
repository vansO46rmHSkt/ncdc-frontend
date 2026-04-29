import type { ComponentPropsWithoutRef } from 'react';
import edit from '@/assets/edit.svg';
import IconButton from './ButtonWithIcon';

const EditButton = (
  props: Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
) => {
  return <IconButton {...props} icon={edit} text="Edit" />;
};

export default EditButton;
