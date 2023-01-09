import type { configObj } from 'js-chess-engine';
import { FC } from 'react';
import { PiecePoint } from '../../../Chessengine';
import Timer from './Timer';

type input = {
  data: configObj;
};
const CustomInfo: FC<input> = ({ data }) => {
  let white: number = 0;
  let black: number = 0;
  for (const piece in data.pieces) {
    const FenLetter = data.pieces[piece];
    const value = PiecePoint[FenLetter];
    if (FenLetter === FenLetter.toUpperCase()) white += value;
    else black += value;
  }

  return (
    <div className="mb-5 columns-3">
      <p className="text-transparent">.</p>
      <p>Point:</p>
      <p>Timer:</p>
      <p>White</p>
      <p>{white - black}</p>
      <p>
        <Timer type="white" data={data} />
      </p>
      <p>Black</p>
      <p>{black - white}</p>
      <p>
        <Timer type="black" data={data} />
      </p>
    </div>
  );
};

export default CustomInfo;
