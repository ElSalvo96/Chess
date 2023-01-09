import classNames from 'classnames';
import { MouseEventHandler, useContext } from 'react';
import { cxChessdata, cxChessengine } from '../../Chessengine';
import { SolidCircle } from '../../ComponentIcon';
import Cell from './Cell';

const helpComponent = <SolidCircle className="text-gray-400 cell-content" />;

/**
 * Generate a helper when click on component
 * @returns list of cells
 */
const usePrintHelper = () => {
  const { selectedCell, data } = useContext(cxChessdata);
  const { setSelectedCell } = useContext(cxChessengine);
  if (data == null || selectedCell === '' || data.moves[selectedCell] == null)
    return null;

  const listOfSuggest = data.moves[selectedCell].map((cellId) => {
    const seeHelper = data.pieces[cellId] == null;
    const onClickHandler: MouseEventHandler = (event) => {
      if (seeHelper) {
        setSelectedCell(cellId);
        event.stopPropagation();
      }
    };
    return (
      <Cell
        key={cellId}
        className={classNames(`cell-${cellId}`, { 'bg-red-300': !seeHelper })}
        onClickCapture={onClickHandler}
      >
        {seeHelper ? helpComponent : null}
      </Cell>
    );
  });

  return listOfSuggest;
};

export default usePrintHelper;
