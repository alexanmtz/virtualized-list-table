import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Virtualized lists/i);
  expect(linkElement).toBeInTheDocument();
});
