import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App'; 

test('renders Vite and React logos', () => {
  render(<App />);

  // Предполагаем, что в вашем App.tsx есть изображения с alt-текстами "Vite logo" и "React logo"
  // Если ваш App.tsx сильно отличается от дефолтного, возможно, нужно будет изменить эти селекторы.
  const viteLogoElement = screen.getByAltText('Vite logo');
  const reactLogoElement = screen.getByAltText('React logo');

  expect(viteLogoElement).toBeInTheDocument();
  expect(reactLogoElement).toBeInTheDocument();
});

// Дополнительный тест, если в App.tsx есть текст "Vite + React"
test('renders "Vite + React" heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Vite \+ React/i); // Поиск текста с учетом регистра
  expect(headingElement).toBeInTheDocument();
});
