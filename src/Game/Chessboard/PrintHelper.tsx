import { FC, Fragment, memo } from 'react';
import usePrintHelper from './usePrintHelper';

const PrintHelper: FC = () => {
  const helpList = usePrintHelper();

  return <Fragment>{helpList}</Fragment>;
};

export default memo(PrintHelper);
