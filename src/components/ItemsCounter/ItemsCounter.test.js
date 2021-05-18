import { screen } from '@testing-library/react';
import React from 'react';
import ItemsCounter from './ItemsCounter';
import { makeTestStore, testRender } from '../../setupTests';

describe('Тестирование компонента ItemsCounter', () => {
  test('Выполнение рендера компонента', () => {
    const store = makeTestStore();

    testRender(<ItemsCounter />, { store });

    const counter = screen.getByTestId('counter');
    expect(counter).toBeInTheDocument();
  });
});
