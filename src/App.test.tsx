import { render, screen } from '@testing-library/react';
import App from './App';

test('App heading check', () => {
  render(<App />);
  const linkElement = screen.getByText(/Decentralized Domain Name Services/i);
  expect(linkElement).toBeInTheDocument();
});
