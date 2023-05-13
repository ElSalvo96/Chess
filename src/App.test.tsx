import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';

const searchCell = (cellId: string) => {
  return screen.getByRole('generic', {
    hidden: false,
    description(accessibleDescription, element) {
      return element.classList.contains(`cell-${cellId}`);
    }
  });
};
const searchImgName = (imgName: string) => {
  return screen.queryAllByRole('img', {
    hidden: true,
    description(accessibleDescription, element) {
      return element.getAttribute('data-icon') === imgName;
    }
  });
};
const searchPiece = (pieceName: string, color: 'white' | 'black') => {
  const pieces = searchImgName(`chess-${pieceName}`);
  return pieces.filter((piece) => {
    const isWhite = piece.classList.contains('text-white');
    if (isWhite && color === 'white') {
      return true;
    }
    if (!isWhite && color !== 'white') {
      return true;
    }
    return false;
  });
};

const testPiece = (pieceName: string, numberOfPiece: number) => {
  const white = searchPiece(pieceName, 'white');
  expect(white).toHaveLength(numberOfPiece);

  const black = searchPiece(pieceName, 'black');
  expect(black).toHaveLength(numberOfPiece);
};

describe('App component', () => {
  test('renders info section', () => {
    render(<App />);
    const info = screen.getByText('Game info');
    expect(info).toBeInTheDocument();
  });
  test('renders settings section', () => {
    render(<App />);
    const Settings = screen.getByText('Settings');
    expect(Settings).toBeInTheDocument();
  });
  test('button start game', () => {
    render(<App />);

    // Text not render
    let text = screen.queryByText('You vs AI');
    expect(text).not.toBeInTheDocument();

    // Get button
    const ButtonVsAnotherYou = screen.getByRole('button', {
      name: 'Reset game'
    }); // Initially selected
    expect(ButtonVsAnotherYou).toBeInTheDocument();
    const ButtonVSAi = screen.getByRole('button', {
      name: 'Start new game VS Ai'
    }); // Not initially selected
    expect(ButtonVSAi).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // After click the text of multiple component change
      userEvent.click(ButtonVSAi);
    });

    // Test text change
    text = screen.getByText('You vs AI');
    expect(text).toBeInTheDocument();
    expect(ButtonVsAnotherYou).toHaveTextContent('Start new game');
    expect(ButtonVSAi).toHaveTextContent('Reset game VS Ai');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // Another click
      userEvent.click(ButtonVsAnotherYou);
    });

    text = screen.getByText('You vs another you');
    expect(text).toBeInTheDocument();
    expect(ButtonVsAnotherYou).toHaveTextContent('Reset game');
    expect(ButtonVSAi).toHaveTextContent('Start new game VS Ai');
  });
  test('render piece rook', async () => {
    render(<App />);
    testPiece('rook', 2);
  });

  test('render piece knight', async () => {
    render(<App />);
    testPiece('knight', 2);
  });
  test('render piece bishop', async () => {
    render(<App />);
    testPiece('bishop', 2);
  });
  test('render piece queen', async () => {
    render(<App />);
    testPiece('queen', 1);
  });
  test('render piece king', async () => {
    render(<App />);
    testPiece('king', 1);
  });
  test('render piece pawn', async () => {
    render(<App />);
    testPiece('pawn', 8);
  });
  test('simulate move', async () => {
    render(<App />);
    const pawn = searchCell('A2');

    let activeCircle = searchImgName('circle');
    expect(activeCircle).toHaveLength(0);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(pawn);
    });
    const possibleA3 = searchCell('A3');
    const possibleA4 = searchCell('A4');

    activeCircle = searchImgName('circle');
    expect(activeCircle).toHaveLength(2);

    try {
      expect(possibleA3).toContainElement(activeCircle[0]);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(possibleA3).toContainElement(activeCircle[1]);
    }
    try {
      expect(possibleA4).toContainElement(activeCircle[0]);
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(possibleA4).toContainElement(activeCircle[1]);
    }
  });
  test('simulate capture and reset game', async () => {
    render(<App />);
    const pawnWhite = searchCell('B2');
    const pawnBlack = searchCell('A7');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // Move pawn white from B2 to B4
      userEvent.click(pawnWhite);
    });

    const possibleB4 = searchCell('B4');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(possibleB4);
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      // Move pawn black from A2 to A5
      userEvent.click(pawnBlack);
    });
    let possibleA5 = searchCell('A5');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(possibleA5);
    });

    // Capture black from B4 to A5
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(pawnWhite);
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(pawnBlack);
    });

    expect(pawnWhite).toHaveClass('cell-A5');
    expect(pawnBlack).toHaveClass('DELETE');

    // Select black tower for capture white pawn
    const towerBlack = searchCell('A8');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(towerBlack);
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(pawnWhite);
    });

    expect(pawnWhite).toHaveClass('DELETE');
    expect(towerBlack).toHaveClass('cell-A5');

    const ButtonVsAnotherYou = screen.getByRole('button', {
      name: 'Reset game'
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(ButtonVsAnotherYou);
    });

    expect(pawnWhite).toHaveClass('cell-B2');
    expect(pawnBlack).toHaveClass('cell-A7');
    expect(towerBlack).toHaveClass('cell-A8');
  });
});
