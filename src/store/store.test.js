import fetchMock from 'fetch-mock';
import { filterInitialState, initialState, todoInitialState } from './index';
import todoSlice, {
  REQUEST_STATE_TYPES,
  add,
  addAll,
  remove,
  checked,
  edit,
  setRequestState,
  setError
} from './reducers/todoSlice';
import filterSlice, { setItemState, setSubstring } from './reducers/filterSlice';
import { SELECT_ITEM_STATE } from './reducers/filterSlice';
import { addItem, removeItem } from './actions';
import {
  selectByFilter,
  selectBySearchString,
  selectFilteredList,
  selectItemsCount
} from './selectors';
import { makeTestStore, list } from '../setupTests';

const title = 'Покормить цветы';
const substring = 'Кот';
const state = initialState;

describe('Проверка функционирования store.js', () => {
  test('Проверка добавления элемента (todoSlice.reducer.add)', () => {
    const action = add(list[1]);
    const newState = todoSlice.reducer(todoInitialState, action);

    expect(newState.list.length).toEqual(1);
    expect(newState.list[0]).toHaveProperty('id');
    expect(newState.list[0].title).toEqual(title);
  });

  test('Проверка добавления всех элементов (todoSlice.reducer.addAll)', () => {
    const addAllAction = addAll(list);

    const state = todoSlice.reducer(todoInitialState, addAllAction);
    expect(state.list.length).toEqual(list.length);
  });

  test('Проверка удаления элемента (todoSlice.reducer.remove)', () => {
    const addAction = add(list[0]);

    let state = todoSlice.reducer(todoInitialState, addAction);

    const removeAction = remove(list[0].id);

    state = todoSlice.reducer(state, removeAction);
    expect(state.list.length).toEqual(0);
  });

  test('Проверка изменения параметра элемента (todoSlice.reducer.checked)', () => {
    const addAction = add(list[0]);

    let state = todoSlice.reducer(todoInitialState, addAction);
    state = todoSlice.reducer(state, addAction);

    const checkedAction = checked(state.list[0].id);

    state = todoSlice.reducer(state, checkedAction);
    expect(state.list[0].isChecked).toBeTruthy();
  });

  test('Проверка изменения элемента (todoSlice.reducer.edit)', () => {
    const newTitle = 'Полить цветы';

    const addAction = add(list[0]);

    let state = todoSlice.reducer(todoInitialState, addAction);
    state = todoSlice.reducer(state, addAction);

    const editAction = edit({ id: state.list[0].id, title: newTitle });

    state = todoSlice.reducer(state, editAction);
    expect(state.list[0].title).toEqual(newTitle);
  });

  test('Проверка изменения фильтра элемента (setItemState)', () => {
    const selectFilterAction = setItemState(SELECT_ITEM_STATE.DONE);
    const state = filterSlice.reducer(filterInitialState, selectFilterAction);
    expect(state.itemState).toEqual(SELECT_ITEM_STATE.DONE);
  });

  test('Проверка поиска элемента по подстроке (setSubstring)', () => {
    const selectBySearchStringAction = setSubstring(substring);
    const state = filterSlice.reducer(filterInitialState, selectBySearchStringAction);
    expect(state.substring).toEqual(substring);
  });

  test('Проверка фильтрации списка selectByFilter', () => {
    let filteredList = selectByFilter(list, SELECT_ITEM_STATE.NOT_DONE);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].id).toEqual(list[0].id);

    filteredList = selectByFilter(list, SELECT_ITEM_STATE.ALL);
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
});
