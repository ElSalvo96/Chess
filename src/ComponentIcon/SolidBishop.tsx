import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const SolidBishop = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faChessBishop} ref={ref} {...props} />;
});
