import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('footer component', () => {
  test('screen name of powered', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    const PoweredBy = screen.getByText('Powered by');
    const Name = screen.getByText('Fabio Salvini', { exact: true });
    expect(footer).toContainElement(PoweredBy);
    expect(PoweredBy).toContainElement(Name);
    expect(Name).toHaveAttribute('href');
  });
  test('screen name of source code', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    const SourceCode = screen.getByText('Source code');
    // eslint-disable-next-line testing-library/no-node-access
    let child = SourceCode.lastElementChild;
    expect(child).not.toBeNull();
    expect(child).toBeInTheDocument();
    expect(child).toHaveAttribute('href');
    // eslint-disable-next-line testing-library/no-node-access
    child = child!.lastElementChild;
    expect(child).toHaveAttribute('data-icon', 'github');
  });
  test('screen js engine copyright', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    const Chessengine = screen.getByText('js-chess-engine', { exact: true });
    expect(footer).toContainElement(Chessengine);
    expect(Chessengine).toHaveAttribute('href');
  });
});
