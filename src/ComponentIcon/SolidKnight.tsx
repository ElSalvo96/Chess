import { faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const SolidKnight = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faChessKnight} ref={ref} {...props} />;
});
