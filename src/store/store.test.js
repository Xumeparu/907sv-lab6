import fetchMock from 'fetch-mock';
import { initialState, createRootReducer } from './index';
import { REQUEST_STATE_TYPES } from './reducers/todoSlice';
import { SELECT_FILTER_TYPES } from './reducers/filterSlice';
import { ACTION_TYPES, getItems, addItem, removeItem } from './actions';
import {
  selectByFilter,
  selectBySearchString,
  selectFilteredList,
  selectItemsCount
} from './selectors';
import { makeTestStore } from '../setupTests';

const title = 'Покормить цветы';
const substring = 'Кот';
const state = initialState;
const list = [
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

describe('Проверка функционирования store.js', () => {
  test('Проверка добавления элемента (ACTION_TYPES.ADD)', () => {
    const action = {
      type: ACTION_TYPES.ADD,
      payload: list[1]
    };

    const newState = createRootReducer(state, action);

    expect(newState.todo.list.length).toEqual(1);
    expect(newState.todo.list[0]).toHaveProperty('id');
    expect(newState.todo.list[0].title).toEqual(title);
  });

  test('Проверка добавления всех элементов (ACTION_TYPES.ADD_ALL)', () => {
    const addAllAction = {
      type: ACTION_TYPES.ADD_ALL,
      payload: list
    };

    const state = createRootReducer(initialState, addAllAction);
    expect(state.todo.list.length).toEqual(list.length);
  });

  test('Проверка удаления элемента (ACTION_TYPES.REMOVE)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = createRootReducer(initialState, addAction);

    const removeAction = {
      type: ACTION_TYPES.REMOVE,
      payload: state.todo.list[0].id
    };

    state = createRootReducer(state, removeAction);
    expect(state.todo.list.length).toEqual(0);
  });

  test('Проверка изменения параметра элемента (ACTION_TYPES.CHECKED)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = createRootReducer(initialState, addAction);
    state = createRootReducer(state, addAction);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.todo.list[0].id
    };

    state = createRootReducer(state, checkedAction);
    expect(state.todo.list[0].isChecked).toBeTruthy();
  });

  test('Проверка изменения элемента (ACTION_TYPES.EDIT)', () => {
    const newTitle = 'Полить цветы';

    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = createRootReducer(initialState, addAction);
    state = createRootReducer(state, addAction);

    const editAction = {
      type: ACTION_TYPES.EDIT,
      payload: { id: state.todo.list[0].id, title: newTitle }
    };

    state = createRootReducer(state, editAction);
    expect(state.todo.list[0].title).toEqual(newTitle);
  });

  test('Проверка изменения фильтра элемента (ACTION_TYPES.SELECT_FILTER)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = createRootReducer(initialState, addAction);

    const selectFilterAction = {
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: SELECT_FILTER_TYPES.DONE
    };

    state = createRootReducer(state, selectFilterAction);
    expect(state.todo.list.length).toEqual(1);
    expect(state.filter.itemState).toEqual(SELECT_FILTER_TYPES.DONE);
  });

  test('Проверка поиска элемента по подстроке (ACTION_TYPES.SELECT_BY_SEARCH_STRING)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: list[0]
    };

    let state = createRootReducer(initialState, addAction);

    const selectBySearchStringAction = {
      type: ACTION_TYPES.SELECT_BY_SEARCH_STRING,
      payload: substring
    };

    state = createRootReducer(state, selectBySearchStringAction);
    expect(state.todo.list.length).toEqual(1);
    expect(state.todo.list[0].isChecked).toEqual(list[0].isChecked);
    expect(state.filter.substring).toEqual(substring);
  });

  test('Проверка фильтрации списка selectByFilter', () => {
    let filteredList = selectByFilter(list, SELECT_FILTER_TYPES.NOT_DONE);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].id).toEqual(list[0].id);

    filteredList = selectByFilter(list, SELECT_FILTER_TYPES.ALL);
    expect(filteredList.length).toEqual(3);
  });

  test('Проверка фильтрации списка selectBySearchString', () => {
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
        filter: SELECT_FILTER_TYPES.DONE,
        substring: 'цве'
      }
    };
    const filteredList = selectFilteredList(state);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].title).toContain(list[1].title);
  });

  test('Проверка default case', () => {
    const defaultAction = {
      type: null
    };
    let state = createRootReducer(initialState, defaultAction);
    expect(state.todo.list.length).toEqual(0);
  });

  test('Проверка selectItemsCount', () => {
    const itemsCount = selectItemsCount(state);
    expect(itemsCount).toBe(state.todo.list.length);
  });
});

describe('Тестирование асинхронных экшенов store.js', () => {
  afterEach(() => fetchMock.reset());

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

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(addItem(list[0].title));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.ADD, payload: list[0] },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.SUCCESS }
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

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(addItem(list[1].title));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.SET_ERROR, payload: errorObject.error },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.ERROR }
    ]);
  });

  test('getItems', async () => {
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

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(getItems());
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.ADD_ALL, payload: list },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.SUCCESS }
    ]);
  });

  test('getItems с ошибкой', async () => {
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
        method: 'GET'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(getItems());
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.SET_ERROR, payload: errorObject.error },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.ERROR }
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
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.REMOVE, payload: list[0].id },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.SUCCESS }
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
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.LOADING },
      { type: ACTION_TYPES.SET_ERROR, payload: errorObject.error },
      { type: ACTION_TYPES.SET_REQUEST_STATE, payload: REQUEST_STATE_TYPES.ERROR }
    ]);
  });
});
