import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ComponentProps, forwardRef } from 'react';
import { Core } from './Core';

type propsT = Omit<ComponentProps<typeof Core>, 'icon'>;

export const BrandsGithub = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <Core icon={faGithub} ref={ref} {...props} />;
});
