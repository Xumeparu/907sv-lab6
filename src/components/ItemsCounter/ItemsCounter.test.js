import { screen } from '@testing-library/react';
import React from 'react';
import ItemsCounter from './ItemsCounter';
import { makeTestStore, testRender } from '../../setupTests';

test('Выполнение рендера компонента ItemsCounter', () => {
  const store = makeTestStore();

  testRender(<ItemsCounter />, { store });

  const counter = screen.getByTestId('counter');
  expect(counter).toBeInTheDocument();
});
