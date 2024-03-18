import { FC, ReactElement } from 'react';

interface ShouldRenderProps {
  if: unknown;
  children: ReactElement<unknown> | null;
}

export const ShouldRender: FC<ShouldRenderProps> = (props) => {
  return props.if ? props.children : null;
};

export default ShouldRender;
