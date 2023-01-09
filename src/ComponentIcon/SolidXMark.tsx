import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const SolidXMark = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faXmark} ref={ref} {...props} />;
});
