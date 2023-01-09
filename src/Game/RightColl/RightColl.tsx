import { FC, memo } from 'react';
import Info from './Info';
import Settings from './Settings';
const RightColl: FC = () => (
  <div className="mx-auto flex max-w-md flex-col gap-y-2 px-5 text-lg text-white lg:mr-10 lg:px-0">
    <Info />
    <Settings />
  </div>
);

export default memo(RightColl);
