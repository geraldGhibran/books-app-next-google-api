import { render, screen } from '@testing-library/react';
import NotImplementedMenu from '../notimplemented';

describe('NotImplementedMenu', () => {
  test('renders without error', () => {
    render(<NotImplementedMenu />);
    expect(screen.getByText("This menu hasn't been implemented yet.")).toBeInTheDocument();
  });

  test('displays the correct error message', () => {
    render(<NotImplementedMenu />);
    expect(screen.getByText('Thanks for your comprehension.')).toBeInTheDocument();
  });
});
