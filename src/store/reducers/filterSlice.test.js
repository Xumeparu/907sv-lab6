import { filterInitialState } from '../index';
import filterSlice, { SELECT_ITEM_STATE, setItemState, setSubstring } from './filterSlice';

describe('Тестирование filterSlice', () => {
  test('Проверка изменения фильтра элемента (filterSlice.reducer.setItemState)', () => {
    const selectFilterAction = setItemState(SELECT_ITEM_STATE.DONE);
    const state = filterSlice.reducer(filterInitialState, selectFilterAction);
    expect(state.itemState).toEqual(SELECT_ITEM_STATE.DONE);
  });

  test('Проверка поиска элемента по подстроке (filterSlice.reducer.setSubstring)', () => {
    const substring = 'Кот';
    const selectBySearchStringAction = setSubstring(substring);
    const state = filterSlice.reducer(filterInitialState, selectBySearchStringAction);
    expect(state.substring).toEqual(substring);
  });
});
