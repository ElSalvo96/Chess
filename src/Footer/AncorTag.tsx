import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
type input = {
  href: string;
  hover?: boolean;
};
const AncorTag: FC<PropsWithChildren<input>> = ({ children, href, hover }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={classNames({
      'transition-all duration-300 hover:animate-pulse hover:border-b-4': hover
    })}
  >
    {children}
  </a>
);

export default AncorTag;
