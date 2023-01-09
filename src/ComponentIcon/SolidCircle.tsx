import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const SolidCircle = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faCircle} ref={ref} {...props} />;
});
