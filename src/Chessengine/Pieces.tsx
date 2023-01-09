import type { LetterFen } from 'js-chess-engine';
import { ElementType } from 'react';
import {
  SolidBishop,
  SolidKing,
  SolidKnight,
  SolidPawn,
  SolidQueen,
  SolidRock
} from '../ComponentIcon';

const PieceList: Record<LetterFen, ElementType> = {
  R: SolidRock,
  P: SolidPawn,
  N: SolidKnight,
  B: SolidBishop,
  K: SolidKing,
  Q: SolidQueen,
  r: SolidRock,
  p: SolidPawn,
  n: SolidKnight,
  b: SolidBishop,
  k: SolidKing,
  q: SolidQueen
};

const PiecePoint: Record<LetterFen, number> = {
  R: 5,
  P: 1,
  N: 3,
  B: 3,
  K: 0,
  Q: 9,
  r: 5,
  p: 1,
  n: 3,
  b: 3,
  k: 0,
  q: 9
};
export { PieceList, PiecePoint };
