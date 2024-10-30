import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should render date and content correctly', () => {
    const date = new Date().getFullYear();

    render(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(
      `© ${date} All rights reserved. Bulut Yerli`
    );
  });
});
