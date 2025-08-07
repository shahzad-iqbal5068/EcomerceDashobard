import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from '../Greeting';

test('renders greeting message with provided name', () => {
  render(<Greeting name="Shahzad" />);

  const greetingText = screen.getByText(/hello, Shahzad!/i);

  expect(greetingText).toBeInTheDocument();
});
