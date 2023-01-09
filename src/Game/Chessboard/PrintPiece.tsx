import { Game } from 'js-chess-engine';
import { FC, Fragment, memo, ReactNode, useMemo } from 'react';
import PieceCell from './PieceCell';

const PrintPiece: FC = () => {
  const listOfPiece = useMemo(() => {
    const listOfPiece: ReactNode[] = [];
    const game = new Game();
    const json = game.exportJson();
    Object.entries(json.pieces).forEach(([cellId, pieceId]) => {
      listOfPiece.push(
        <PieceCell cellId={cellId} key={cellId} pieceId={pieceId} />
      );
    });
    return listOfPiece;
  }, []);

  return <Fragment>{listOfPiece}</Fragment>;
};

export default memo(PrintPiece);
