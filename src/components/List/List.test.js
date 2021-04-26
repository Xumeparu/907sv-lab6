import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import List, { DecoupledList } from './List';
import { REQUEST_STATE_TYPES } from '../../store/reducers/todoSlice';
import { ACTION_TYPES } from '../../store/actions';
import { makeTestStore, testRender, list } from '../../setupTests';

test('Корректное отображение пустого списка', () => {
  const list = [];
  const store = makeTestStore();
  testRender(<DecoupledList list={list} />, { store });
  expect(screen.getByText('Список пуст')).toBeInTheDocument();
});

test('Корректное отображение списка элементов', () => {
  const store = makeTestStore({ useMockStore: true });
  testRender(<DecoupledList list={list} />, { store });

  for (let item of list) {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  }

  for (let deleteButton of screen.getAllByTestId('deleteButton')) {
    fireEvent.click(deleteButton);
  }
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});

test('Отображение чекбоксов в нужном состоянии', () => {
  const store = makeTestStore({ initialState: { list, substring: '' } });
  testRender(<DecoupledList list={list} />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    expect(checkboxes[i].checked).toEqual(list[i].isChecked);
  }
});

test('Вызов checkHandler с нужными параметрами при клике на чекбокс', () => {
  const store = makeTestStore({ initialState: { list, substring: '' } });
  testRender(<DecoupledList list={list} />, { store });

  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < checkboxes; i++) {
    fireEvent.click(checkboxes[i]);
    expect(store.dispatch).toBeCalledWith({ type: ACTION_TYPES.CHECKED, payload: list[i].id });
  }
});

test('<List> вызывает асинхронный экшен getItems', () => {
  const store = makeTestStore({ useMockStore: true });
  testRender(<List />, { store });

  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATE,
    payload: REQUEST_STATE_TYPES.LOADING
  });
});
