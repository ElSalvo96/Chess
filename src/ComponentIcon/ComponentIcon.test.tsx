import { render, screen } from '@testing-library/react';
import {
  BrandsGithub,
  SolidBishop,
  SolidCircle,
  SolidKing,
  SolidKnight,
  SolidPawn,
  SolidQueen,
  SolidRock,
  SolidXMark
} from './index';

const testImg = (name: string) => {
  try {
    const component = screen.getByRole('img', { hidden: true });
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('data-icon', name);
  } catch (error) {
    console.log('testImg', name);
    throw error;
  }
};

describe('Integration testing of Icon component section', () => {
  test('render of github brand', () => {
    render(<BrandsGithub />);
    testImg('github');
  });
  test('render of Solid Circle', () => {
    render(<SolidCircle />);
    testImg('circle');
  });
  test('render of Solid X Mark', () => {
    render(<SolidXMark />);
    testImg('xmark');
  });
  test('render of Solid Bishop', () => {
    render(<SolidBishop />);
    testImg('chess-bishop');
  });
  test('render of Solid King', () => {
    render(<SolidKing />);
    testImg('chess-king');
  });
  test('render of Solid Knight', () => {
    render(<SolidKnight />);
    testImg('chess-knight');
  });
  test('render of Solid Pawn', () => {
    render(<SolidPawn />);
    testImg('chess-pawn');
  });
  test('render of Solid Queen', () => {
    render(<SolidQueen />);
    testImg('chess-queen');
  });
  test('render of Solid Rook', () => {
    render(<SolidRock />);
    testImg('chess-rook');
  });
});
