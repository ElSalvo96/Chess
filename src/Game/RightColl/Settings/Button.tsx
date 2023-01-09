import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

/**
 * Base component button
 */
const Button: FC<HtmlHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => <button {...props} className={classNames('base', className)} />;

export default Button;
