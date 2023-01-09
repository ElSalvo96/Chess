import { FC, memo } from 'react';
import { BrandsGithub } from '../ComponentIcon';
import AncorTag from './AncorTag';
import Row from './Row';
const Footer: FC = () => (
  <footer className="my-5 basis-full gap-y-4 border-t-8 border-solid border-blue-800 text-center text-lg text-white">
    <Row>
      Powered by&nbsp;
      <AncorTag href="https://www.linkedin.com/in/fabiosalvini/" hover>
        Fabio Salvini
      </AncorTag>
    </Row>
    <Row>
      Source code&nbsp;
      <AncorTag href="https://github.com/ElSalvo96/Chess">
        <BrandsGithub className="hover:rounded-full hover:bg-slate-200 hover:text-slate-800" />
      </AncorTag>
    </Row>
    <Row>
      This web site is using an open-source chess engine:&nbsp;
      <AncorTag href="https://www.npmjs.com/package/js-chess-engine" hover>
        js-chess-engine
      </AncorTag>
    </Row>
  </footer>
);

export default memo(Footer);
