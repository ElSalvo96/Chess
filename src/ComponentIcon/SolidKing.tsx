import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const SolidKing = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faChessKing} ref={ref} {...props} />;
});
