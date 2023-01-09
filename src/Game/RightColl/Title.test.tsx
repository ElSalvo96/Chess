import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title component', () => {
  test('render children and test visibility', () => {
    render(<Title children="CHILDREN TEST" />);
    const linkElement = screen.getByText('CHILDREN TEST');
    expect(linkElement).toBeInTheDocument();
  });
});
