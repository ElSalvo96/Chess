import { FC, PropsWithChildren } from 'react';
const Title: FC<Required<PropsWithChildren>> = ({ children }) => (
  <p className="mx-auto my-2 w-fit text-xl font-bold">{children}</p>
);

export default Title;
