import { runSaga } from 'redux-saga';
import { getItemsSaga } from './sagas';
import fetchMock from 'fetch-mock';
import { REQUEST_STATE_TYPES } from '../reducers/todoSlice';
import { ACTION_TYPES } from '../actions';
import { list } from '../../setupTests';

afterEach(() => fetchMock.reset());

const errorObject = {
  error: 'Error message'
};

test('getItemsSaga', async () => {
  fetchMock.mock(
    'express:/todos',
    {
      status: 200,
      body: list
    },
    {
      method: 'GET'
    }
  );

  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => ({})
    },
    getItemsSaga
  ).toPromise();
  expect(dispatched).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
    { type: ACTION_TYPES.ADD_ALL, payload: list },
    { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.SUCCESS }
  ]);
});

test('getItemsSaga с ошибкой', async () => {
  fetchMock.mock(
    'express:/todos',
    {
      status: 500,
      body: errorObject
    },
    {
      method: 'GET'
    }
  );

  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => ({})
    },
    getItemsSaga
  ).toPromise();
  expect(dispatched).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
    { type: ACTION_TYPES.SET_ERROR, payload: errorObject.error },
    { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.ERROR }
  ]);
});
