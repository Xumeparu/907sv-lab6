import { todoInitialState } from '../index';
import todoSlice, { add, addAll, checked, edit, remove } from './todoSlice';
import { list } from '../../setupTests';

describe('Тестирование todoSlice', () => {
  test('Проверка добавления элемента (todoSlice.reducer.add)', () => {
    const title = 'Покормить цветы';

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
});
