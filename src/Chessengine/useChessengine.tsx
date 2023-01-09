import { configObj, Game, LetterFen, levelType } from 'js-chess-engine';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import type Chessdata from './Chessdata';

type game = 'VSAI' | 'PLAY';
type liftUpCallbackT = Parameters<
  ComponentProps<typeof Chessdata>['liftUpCallback']
>['0'];
type subscribeInput = {
  fn: (newCell: string, pieceId?: LetterFen) => string;
  cellId: string;
  isDeleted: boolean;
};

// Immediate create a new game
const gameInitialValue = new Game();

const useChessengine = () => {
  const refActiveGame = useRef<Game>(gameInitialValue);
  const refLevel = useRef<levelType>(2);
  const refCallback = useRef<liftUpCallbackT | null>(null);
  const [playType, setPlayType] = useState<game>('PLAY');
  const subscribeList = useRef<subscribeInput[]>([]);
  const oldCastling = useRef<configObj['castling'] | null>(null);

  /**
   * checkData is used for:
   * - detect what cell need to refresh and call new move
   * - refresh data object after move or other actions
   */
  const checkData = useCallback((move?: { [key: string]: string }) => {
    if (!refActiveGame.current) return;
    if (!refCallback.current) return;
    const data = refActiveGame.current.exportJson();

    if (move != null) {
      const from = Object.keys(move)[0];
      const to = move[from];
      let otherCheck = '';
      let newCellOther = '';
      if (data.fullMove > 2) {
        const history = refActiveGame.current.getHistory();
        const pieceBefore = Object.keys(
          history[history.length - 1].configuration.pieces
        );
        // Compare all the pieces to understand if something has changed or not.
        // These cases represent the 5 stocks that have a move to an unmonitored cell.
        // - enPassant
        // - castling white long
        // - castling white shorts
        // - castling black long
        // - castling black shorts
        const newPositions: string[] = [];
        const oldPositions: string[] = [];
        const pieceNow = Object.keys(data.pieces);
        pieceBefore.forEach((key) => {
          if (!pieceNow.includes(key)) {
            newPositions.push(key);
          }
        });
        pieceNow.forEach((key) => {
          if (!pieceBefore.includes(key)) {
            oldPositions.push(key);
          }
        });
        otherCheck =
          newPositions.find((value) => value !== from && value !== to) || '';
        newCellOther =
          oldPositions.find((value) => value !== from && value !== to) ||
          'DELETE';
      }

      const subscriberFrom = subscribeList.current.find(
        ({ cellId, isDeleted }) => cellId === from && !isDeleted
      );
      const subscriberTo = subscribeList.current.find(
        ({ cellId, isDeleted }) => cellId === to && !isDeleted
      );
      const subscriberOtherCheck =
        otherCheck === ''
          ? null
          : subscribeList.current.find(
              ({ cellId, isDeleted }) => cellId === otherCheck && !isDeleted
            );
      // If find, from cell always move
      if (subscriberFrom != null) {
        subscriberFrom.cellId = to;
        subscriberFrom.fn(to, data.pieces[to]);
      }
      // If find, to cell always delete
      if (subscriberTo != null) {
        subscriberTo.cellId = 'DELETE';
        subscriberTo.isDeleted = true;
        subscriberTo.fn('DELETE');
      }
      // If find check if deleted or not
      if (subscriberOtherCheck != null) {
        subscriberOtherCheck.cellId = newCellOther;
        subscriberOtherCheck.isDeleted = newCellOther === 'DELETE';
        subscriberOtherCheck.fn(newCellOther, data.pieces[newCellOther]);
      }
    }
    oldCastling.current = Object.assign({}, data.castling);
    refCallback.current.setData(data);
  }, []);

  useEffect(() => {
    checkData();
  }, [checkData]);

  return {
    checkData,
    refActiveGame,
    refLevel,
    refCallback,
    playType,
    setPlayType,
    subscribeList: subscribeList.current
  };
};

export default useChessengine;
