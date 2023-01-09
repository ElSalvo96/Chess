import { FC, Fragment, useContext } from 'react';
import { cxChessdata, cxChessengine } from '../../../Chessengine';
import Title from '../Title';
import CustomInfo from './CustomInfo';

const gameState: Record<
  Parameters<typeof cxChessengine['Provider']>['0']['value']['playType'],
  string
> = {
  PLAY: 'You vs another you',
  VSAI: 'You vs AI'
};

/**
 * Info section
 */
const Info: FC = () => {
  const { data } = useContext(cxChessdata);
  const { playType } = useContext(cxChessengine);
  if (data == null) return null;

  return (
    <Fragment>
      <Title>Game info</Title>
      <CustomInfo data={data} />
      <p>
        Turn number:&nbsp;<span>{data.fullMove}</span>
      </p>
      <p>
        Turn:&nbsp;<span className="capitalize">{data.turn}</span>
      </p>
      <p>
        Game type:&nbsp;
        <span>{data.isFinished ? 'Finish' : gameState[playType]}</span>
      </p>
    </Fragment>
  );
};

export default Info;
