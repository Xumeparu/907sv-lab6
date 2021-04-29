import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Filter from './Filter';
import { SELECT_ITEM_STATE } from '../../store/reducers/filterSlice';
import { ACTION_TYPES } from '../../store/actions';
import { makeTestStore, testRender } from '../../setupTests';

const store = makeTestStore({
  initialState: { todo: [], filter: SELECT_ITEM_STATE.ALL, substring: '' }
});

test('Выполнение рендера компонента Filter', () => {
  testRender(<Filter />, { store });

  const selector = screen.getByTestId('selector');
  expect(selector).toBeInTheDocument();
});

test('Отображение компонентом параметров фильтрации', () => {
  testRender(<Filter />, { store });

  for (let option of Object.values(SELECT_ITEM_STATE)) {
    expect(screen.getByText(option)).toBeInTheDocument();
  }
});

test('Отображение компонентом элементов с правильными параметрами фильтрации', () => {
  testRender(<Filter />, { store });

  const selector = screen.getByTestId('selector');
  expect(store.dispatch).not.toBeCalled();
  fireEvent.change(selector, {
    target: {
      value: SELECT_ITEM_STATE.DONE
    }
  });
  expect(store.dispatch).toBeCalledWith({
    type: ACTION_TYPES.SELECT_BY_FILTER,
    payload: SELECT_ITEM_STATE.DONE
  });
});
