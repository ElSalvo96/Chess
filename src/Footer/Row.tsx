import { FC, PropsWithChildren } from 'react';

const Row: FC<Required<PropsWithChildren>> = ({ children }) => (
  <p className="my-1">{children}</p>
);

export default Row;
