import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState as originalInitialState } from './store';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const TestProvider = ({ store, children }) => <Provider store={store}>{children}</Provider>;

export function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

export function makeTestStore({ initialState = originalInitialState } = {}) {
  let store;
  if (initialState === undefined) {
    initialState = originalInitialState;
  }
  store = mockStore(initialState);

  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);
  return store;
}

export const list = [
  {
    id: '1',
    title: 'Полить кота',
    isChecked: false
  },
  {
    id: '2',
    title: 'Покормить цветы',
    isChecked: true
  },
  {
    id: '3',
    title: 'Написать тесты',
    isChecked: true
  }
];
