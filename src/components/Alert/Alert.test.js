import { screen } from '@testing-library/react';
import React from 'react';
import Alert from './Alert';
import { makeTestStore, testRender } from '../../setupTests';

test('Выполнение рендера компонента Alert', () => {
  const store = makeTestStore();

  testRender(<Alert />, { store });

  const alert = screen.getByTestId('alert');
  expect(alert).toBeInTheDocument();
});
