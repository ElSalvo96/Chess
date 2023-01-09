import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ComponentProps, forwardRef } from 'react';

type propsT = ComponentProps<typeof FontAwesomeIcon>;

export const Core = forwardRef<SVGSVGElement, propsT>((props, ref) => {
  return <FontAwesomeIcon ref={ref} {...props} />;
});

Core.defaultProps = {
  size: 'xl'
};
