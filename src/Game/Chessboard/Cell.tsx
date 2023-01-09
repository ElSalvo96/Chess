import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';

/**
 * Single cell
 */
const Cell = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        className,
        'absolute top-0 left-0 h-1/8 w-1/8 overflow-hidden'
      )}
      {...props}
    ></div>
  )
);

export default Cell;
