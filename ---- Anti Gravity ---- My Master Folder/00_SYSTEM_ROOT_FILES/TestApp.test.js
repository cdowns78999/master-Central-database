import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './TestApp';

test('renders and responds to a guess', () => {
  render(<App />);
  expect(screen.getByText('Guess the Number Game')).toBeInTheDocument();
  expect(screen.getByText('Guess a number from 1 to 10')).toBeInTheDocument();

  const input = screen.getByLabelText('guess-input');
  const button = screen.getByText('Guess');

  fireEvent.change(input, { target: { value: '5' } });
  fireEvent.click(button);

  expect(
    screen.getByText(/Correct|Too low|Too high/)
  ).toBeInTheDocument();
});