import { Game, levelType } from 'js-chess-engine';
import { createContext, FC, PropsWithChildren, useCallback } from 'react';
import Chessdata from './Chessdata';
import useChessengine from './useChessengine';

type returnPropsEngine = ReturnType<typeof useChessengine>;
type subscribeInput = returnPropsEngine['subscribeList'][number];
type liftUpCallbackT = Exclude<
  returnPropsEngine['refCallback']['current'],
  null
>;
type ctxType = {
  playType: returnPropsEngine['playType'];
  startGame: (vsAi?: boolean) => void;
  aiMove: () => void;
  setLevel: (lv: levelType) => void;
  move: (from: string, to: string) => void;
  level: levelType;
  subscribe: (input: subscribeInput) => void;
  setSelectedCell: liftUpCallbackT['selectCellHandler'];
};

export const cxChessengine = createContext<ctxType>({
  playType: 'PLAY',
  startGame() {},
  aiMove() {},
  setLevel(lv) {},
  move(from, to) {},
  level: 2,
  subscribe(input) {},
  setSelectedCell(input) {}
});

export const Chessengine: FC<Required<PropsWithChildren>> = ({ children }) => {
  const {
    checkData,
    refActiveGame,
    refCallback,
    refLevel,
    playType,
    setPlayType,
    subscribeList
  } = useChessengine();

  const startGame = (vsAi?: boolean) => {
    refActiveGame.current = new Game();
    subscribeList.forEach((item) => {
      item.cellId = item.fn('RESET');
      item.isDeleted = false;
    });
    checkData();
    if (vsAi) setPlayType('VSAI');
    else setPlayType('PLAY');
  };

  const aiMove = () => {
    if (!refActiveGame) return;
    checkData(refActiveGame.current.aiMove(refLevel.current));
  };

  const setLevel = (lv: levelType) => {
    refLevel.current = lv;
  };

  const move = (from: string, to: string) => {
    if (!refActiveGame.current) return;
    checkData(refActiveGame.current.move(from, to));
    if (playType === 'VSAI') {
      setTimeout(() => {
        aiMove();
      }, 1000);
    }
  };

  /**
   * Callback for save data and set cell
   */
  const liftUpCallback = (callback: liftUpCallbackT) => {
    refCallback.current = callback;
    const data = refActiveGame.current.exportJson();
    refCallback.current.setData(data);
  };

  const setSelectedCell: ctxType['setSelectedCell'] = (cellId) => {
    refCallback.current?.selectCellHandler(cellId);
  };

  /**
   * Save callback for cell
   */
  const subscribe = useCallback(
    (subscribe: subscribeInput) => {
      const subscriber = subscribeList.find(
        ({ cellId }) => cellId === subscribe.cellId
      );
      if (subscriber) subscriber.fn = subscribe.fn;
      else subscribeList.push(subscribe);
    },
    [subscribeList]
  );

  const obj: ctxType = {
    playType,
    startGame,
    aiMove,
    setLevel,
    move,
    level: refLevel.current,
    subscribe,
    setSelectedCell
  };
  return (
    <cxChessengine.Provider value={obj}>
      <Chessdata liftUpCallback={liftUpCallback} move={move}>
        {children}
      </Chessdata>
    </cxChessengine.Provider>
  );
};
