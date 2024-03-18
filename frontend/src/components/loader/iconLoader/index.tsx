import { FC } from 'react';
import * as Styled from './styles';

export type PropType = {
  color?: string;
  sayHello?: string;
  className?: string;
};
const IconLoader: FC<PropType> = ({ color, sayHello, ...props }: PropType) => {
  return <Styled.LoadingSpinner {...props} color={color} sayHello={sayHello} />;
};

export default IconLoader;
