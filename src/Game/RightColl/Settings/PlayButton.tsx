import { FC, memo, MouseEventHandler, useContext } from 'react';
import { cxChessengine } from '../../../Chessengine';
import Button from './Button';

type input = {
  vsAi?: boolean;
};

/**
 * Play button
 */
const PlayButton: FC<input> = ({ vsAi }) => {
  const { startGame, playType } = useContext(cxChessengine);
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    startGame(vsAi);
  };

  /**
   * Schema message
   * button_Ai playType    text
   * 0         VSAI        Start new
   * 0         PLAY        Reset
   * 1         VSAI        Reset
   * 1         PLAY        Start new
   */
  const result: string = vsAi
    ? playType === 'VSAI'
      ? 'Reset game VS Ai'
      : 'Start new game VS Ai'
    : playType === 'VSAI'
    ? 'Start new game'
    : 'Reset game';

  return <Button onClick={onClickHandler}>{result}</Button>;
};
PlayButton.defaultProps = {
  vsAi: false
};

export default memo(PlayButton);
