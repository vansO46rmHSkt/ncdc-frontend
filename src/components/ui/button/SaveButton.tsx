import save from '@/assets/save.svg';
import { type ButtonProps } from './Button';
import IconButton from './ButtonWithIcon';

const SaveButton = (props: Omit<ButtonProps, 'children'>) => {
  return <IconButton {...props} icon={save} text="Save" />;
};

export default SaveButton;
