import fetchMock from 'fetch-mock';
import { push } from 'connected-react-router';
import { initialState } from './index';
import { REQUEST_STATE_TYPES, add, remove, setRequestState, setError } from './reducers/todoSlice';
import { SELECT_ITEM_STATE } from './reducers/filterSlice';
import { addItem, removeItem, check, login, logout } from './actions';
import {
  selectByFilter,
  selectBySearchString,
  selectFilteredList,
  selectItemsCount
} from './selectors';
import { makeTestStore, list } from '../setupTests';

const state = initialState;

describe('Тестирование селекторов', () => {
  test('Проверка фильтрации списка selectByFilter', () => {
    let filteredList = selectByFilter(list, SELECT_ITEM_STATE.NOT_DONE);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].id).toEqual(list[0].id);

    filteredList = selectByFilter(list, SELECT_ITEM_STATE.ALL);
    expect(filteredList.length).toEqual(3);
  });

  test('Проверка фильтрации списка selectBySearchString', () => {
    const substring = 'Кот';
    let filteredList = selectBySearchString(list, substring);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].title).toContain(list[0].title);

    filteredList = selectBySearchString(list, '');
    expect(filteredList.length).toEqual(list.length);
  });

  test('Проверка фильтрации списка selectFilteredList', () => {
    const state = {
      ...initialState,
      todo: { list },
      filter: {
        filter: SELECT_ITEM_STATE.DONE,
        substring: 'цве'
      }
    };
    const filteredList = selectFilteredList(state);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].title).toContain(list[1].title);
  });

  test('Проверка selectItemsCount', () => {
    const itemsCount = selectItemsCount(state);
    expect(itemsCount).toBe(state.todo.list.length);
  });
});

describe('Тестирование асинхронных экшенов', () => {
  afterEach(() => fetchMock.reset());

  const errorObject = {
    error: 'Error message'
  };

  const username = 'admin';
  const password = '123';

  test('addItem', async () => {
    fetchMock.mock(
      'express:/todos',
      {
        status: 200,
        body: list[0]
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore();
    await store.dispatch(addItem(list[0].title));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      add(list[0]),
      setRequestState(REQUEST_STATE_TYPES.SUCCESS)
    ]);
  });

  test('addItem с ошибкой', async () => {
    const errorObject = {
      error: 'Error message'
    };

    fetchMock.mock(
      'express:/todos',
      {
        status: 500,
        body: errorObject
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore();
    await store.dispatch(addItem(list[1].title));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      setError(errorObject.error),
      setRequestState(REQUEST_STATE_TYPES.ERROR)
    ]);
  });

  test('removeItem', async () => {
    fetchMock.mock(
      'express:/todos/:id',
      {
        status: 200,
        body: {}
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore({ initialState: list, useMockStore: true });
    await store.dispatch(removeItem(list[0].id));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      remove(list[0].id),
      setRequestState(REQUEST_STATE_TYPES.SUCCESS)
    ]);
  });

  test('removeItem с ошибкой', async () => {
    const errorObject = {
      error: 'Error message'
    };

    fetchMock.mock(
      'express:/todos/:id',
      {
        status: 500,
        body: errorObject
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore({ initialState: list, useMockStore: true });
    await store.dispatch(removeItem(list[0].id));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      setError(errorObject.error),
      setRequestState(REQUEST_STATE_TYPES.ERROR)
    ]);
  });

  test('check', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 200,
        body: {}
      },
      {
        method: 'GET'
      }
    );

    const store = makeTestStore();
    await store.dispatch(check());
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      push('/todo'),
      setRequestState(REQUEST_STATE_TYPES.SUCCESS)
    ]);
  });

  test('check с ошибкой', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 500,
        body: errorObject
      },
      {
        method: 'GET'
      }
    );

    const store = makeTestStore();
    await store.dispatch(check());
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      setError(errorObject.error),
      setRequestState(REQUEST_STATE_TYPES.ERROR)
    ]);
  });

  test('login', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 200,
        body: { username, password }
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore();
    await store.dispatch(login(username, password));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      push('/todo'),
      setRequestState(REQUEST_STATE_TYPES.SUCCESS)
    ]);
  });

  test('login с ошибкой', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 500,
        body: errorObject
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore();
    await store.dispatch(login(username, password));
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      setError(errorObject.error),
      setRequestState(REQUEST_STATE_TYPES.ERROR)
    ]);
  });

  test('logout', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 200,
        body: {}
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore();
    await store.dispatch(logout());
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      push('/login'),
      setRequestState(REQUEST_STATE_TYPES.SUCCESS)
    ]);
  });

  test('logout с ошибкой', async () => {
    fetchMock.mock(
      'express:/auth',
      {
        status: 500,
        body: errorObject
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore();
    await store.dispatch(logout());
    expect(store.getActions()).toEqual([
      setRequestState(REQUEST_STATE_TYPES.LOADING),
      setError(errorObject.error),
      setRequestState(REQUEST_STATE_TYPES.ERROR)
    ]);
  });
});
