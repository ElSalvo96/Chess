import { faChessBishop } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';
import { Core } from './Core';

describe('Unit testing of Icon component section', () => {
  test('core component icon children', () => {
    render(<Core icon={faChessBishop} />);
    const component = screen.getByRole('img', { hidden: true });
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('data-icon', 'chess-bishop');
  });
  test('core component passing props', () => {
    render(<Core icon={faChessBishop} className="TEST" />);
    const component = screen.getByRole('img', { hidden: true });
    expect(component).toHaveClass('TEST');
  });
  test('core component default size', () => {
    render(<Core icon={faChessBishop} />);
    const component = screen.getByRole('img', { hidden: true });
    expect(component).toHaveClass('fa-xl');
  });
  test('core component specific size', () => {
    render(<Core icon={faChessBishop} size="xs" />);
    const component = screen.getByRole('img', { hidden: true });
    expect(component).toHaveClass('fa-xs');
  });
});
