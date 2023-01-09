import { FC } from 'react';
import { Chessengine } from './Chessengine';
import Footer from './Footer';
import { Chessboard, RightColl } from './Game';

const App: FC = () => {
  return (
    <div className="mx-auto mt-10 flex w-full flex-col flex-wrap lg:flex-row">
      <Chessengine>
        <div className="mx-5 shrink grow-[2]">
          <Chessboard />
        </div>
        <div className="my-10 shrink grow">
          <RightColl />
        </div>
      </Chessengine>
      {/* Force break line */}
      <div className="basis-full"></div>
      <Footer />
    </div>
  );
};

export default App;
