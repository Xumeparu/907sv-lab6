import { runSaga } from 'redux-saga';
import { getItemsSaga } from './sagas';
import fetchMock from 'fetch-mock';
import { REQUEST_STATE_TYPES, addAll, setRequestState, setError } from '../reducers/todoSlice';
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
    setRequestState(REQUEST_STATE_TYPES.LOADING),
    addAll(list),
    setRequestState(REQUEST_STATE_TYPES.SUCCESS)
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
    setRequestState(REQUEST_STATE_TYPES.LOADING),
    setError(errorObject.error),
    setRequestState(REQUEST_STATE_TYPES.ERROR)
  ]);
});
