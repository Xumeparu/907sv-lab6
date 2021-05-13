import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Form from './Form';
import { REQUEST_STATE_TYPES, setRequestState } from '../../store/reducers/todoSlice';
import { makeTestStore, testRender } from '../../setupTests';

test('Форма позволяет вводить данные, вызывает обработчик', () => {
  const store = makeTestStore();
  const value = '19';

  testRender(<Form />, { store });

  const input = screen.getByTestId('input');
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
  expect(store.dispatch).not.toBeCalled();

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  expect(store.getActions()[0]).toEqual(setRequestState(REQUEST_STATE_TYPES.LOADING));
});
