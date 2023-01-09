import { configObj } from 'js-chess-engine';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import ModalFinishGame from './ModalFinishGame';

type ctxType = {
  data: configObj | null;
  selectedCell: string;
};

type input = {
  liftUpCallback: (callbacks: {
    setData: Dispatch<SetStateAction<configObj>>;
    selectCellHandler: (cellId?: string) => void;
  }) => void;
  move: (from: string, to: string) => void;
};

export const cxChessdata = createContext<ctxType>({
  data: null,
  selectedCell: ''
});

const Chessdata: FC<Required<PropsWithChildren<input>>> = ({
  children,
  liftUpCallback,
  move
}) => {
  const refMove = useRef(move);
  refMove.current = move;
  const [data, setData] = useState<configObj | null>(null);
  const refData = useRef(data);
  refData.current = data;
  const [selectedCell, setSelectedCell] = useState<string>('');
  const oldCell = useRef(selectedCell);
  oldCell.current = selectedCell;
  const selectCellHandler = useCallback((cellId?: string) => {
    if (cellId == null) {
      setSelectedCell('');
    } else {
      if (oldCell.current !== '') {
        // Check if move is possibile
        if (refData.current?.moves[oldCell.current].includes(cellId)) {
          refMove.current(oldCell.current, cellId);
          setSelectedCell('');
        } else {
          if (refData.current?.moves[cellId] != null) setSelectedCell(cellId);
          else setSelectedCell(''); // Reset move
        }
      } else {
        // Set moves only if possible
        if (refData.current?.moves[cellId] != null) setSelectedCell(cellId);
      }
    }
  }, []);

  useEffect(() => {
    liftUpCallback({
      setData: setData as Dispatch<SetStateAction<configObj>>,
      selectCellHandler
    });
  }, [liftUpCallback, selectCellHandler]);

  const obj: ctxType = { data, selectedCell };
  return (
    <cxChessdata.Provider value={obj}>
      {children}
      <ModalFinishGame />
    </cxChessdata.Provider>
  );
};

export default Chessdata;
