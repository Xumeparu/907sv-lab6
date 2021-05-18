import { screen } from '@testing-library/react';
import React from 'react';
import Logout from './Logout';
import { makeTestStore, testRender } from '../../setupTests';

describe('Тестирование компонента LoginForm', () => {
  test('Выполнение рендера компонента', () => {
    const store = makeTestStore();

    testRender(<Logout />, { store });

    const logout = screen.getByTestId('logout');
    expect(logout).toBeInTheDocument();
  });
});
