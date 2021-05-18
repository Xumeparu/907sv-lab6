import { screen } from '@testing-library/react';
import React from 'react';
import LoginForm from './LoginForm';
import { makeTestStore, testRender } from '../../setupTests';

describe('Тестирование компонента LoginForm', () => {
  test('Выполнение рендера компонента', () => {
    const store = makeTestStore();

    testRender(<LoginForm />, { store });

    const loginForm = screen.getByTestId('loginForm');
    expect(loginForm).toBeInTheDocument();
  });
});
