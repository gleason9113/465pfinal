/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // Provide the desired test data
  })
);

test('renders MainView on startup', () => {
  render( 
      <App />
  );
  // If MainView contains an element with a certain text
  // For instance, a header text that reads 'Main View'
  // We can check if it exists in the document
  const mainViewElement = screen.getByText(/Main View/i);
  expect(mainViewElement).toBeInTheDocument();
});