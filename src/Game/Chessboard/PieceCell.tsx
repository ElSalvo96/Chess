import classNames from 'classnames';
import { LetterFen } from 'js-chess-engine';
import {
  FC,
  memo,
  MouseEventHandler,
  useContext,
  useEffect,
  useState
} from 'react';
import { cxChessengine, PieceList } from '../../Chessengine';
import Cell from './Cell';

type input = {
  cellId: string;
  pieceId: LetterFen;
};

/**
 * Core component for move single piece
 * When render, this component subscribe the refresh with the initial cell name
 * When reset, we set the initial state
 */
const PieceCell: FC<input> = ({
  cellId: initialCellId,
  pieceId: initialPieceId
}) => {
  const { subscribe, setSelectedCell } = useContext(cxChessengine);
  const [cellPosition, setCellPosition] = useState(initialCellId);
  const [pieceId, setPieceId] = useState(initialPieceId);

  useEffect(() => {
    const fn = (newCell: string, pieceId?: LetterFen) => {
      if (newCell === 'RESET') {
        setCellPosition(initialCellId);
        setPieceId(initialPieceId);
      } else {
        setCellPosition(newCell);
        if (pieceId != null) setPieceId(pieceId);
      }

      return initialCellId; // Always return the native cell
    };
    subscribe({ fn, cellId: initialCellId, isDeleted: false });
  }, [subscribe, initialCellId, initialPieceId]);

  const onClickHandler: MouseEventHandler = (event) => {
    setSelectedCell(cellPosition);
    event.stopPropagation();
  };

  const Piece = PieceList[pieceId];
  return (
    <Cell
      className={classNames(
        'transition-piece cursor-pointer hover:shadow-inner hover:shadow-cyan-500/50',
        cellPosition === 'DELETE' ? cellPosition : `cell-${cellPosition}`
      )}
      onClick={onClickHandler}
    >
      <Piece
        className={classNames(
          pieceId === pieceId.toUpperCase()
            ? 'text-white'
            : 'text-slate-900/80',
          'h-5/6 cell-content piece-border'
        )}
      />
    </Cell>
  );
};
export default memo(PieceCell);
