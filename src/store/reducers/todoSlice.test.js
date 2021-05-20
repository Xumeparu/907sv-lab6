import { todoInitialState } from '../index';
import todoSlice, { add, addAll, remove, checked, edit } from './todoSlice';
import { list } from '../../setupTests';

describe('Тестирование todoSlice', () => {
  test('Проверка добавления одного элемента (add)', () => {
    const title = 'Полить кота';

    const addAction = add(list[0]);
    let state = todoSlice.reducer(todoInitialState, addAction);

    expect(state.list.length).toEqual(1);
    expect(state.list[0]).toHaveProperty('id');
    expect(state.list[0]).toHaveProperty('title');
    expect(state.list[0]).toHaveProperty('isChecked');
    expect(state.list[0].title).toEqual(title);
  });

  test('Проверка добавления всех элементов (addAll)', () => {
    const addAllAction = addAll(list);
    let state = todoSlice.reducer(todoInitialState, addAllAction);

    expect(state.list.length).toEqual(list.length);
  });

  test('Проверка удаления элемента (remove)', () => {
    const addAction = add(list[0]);
    let state = todoSlice.reducer(todoInitialState, addAction);

    const removeAction = remove(list[0].id);
    state = todoSlice.reducer(state, removeAction);

    expect(state.list.length).toEqual(0);
  });

  test('Проверка изменения параметра элемента (checked)', () => {
    const addAction = add(list[0]);
    let state = todoSlice.reducer(todoInitialState, addAction);
    state = todoSlice.reducer(state, addAction);

    const checkedAction = checked(state.list[0].id);
    state = todoSlice.reducer(state, checkedAction);

    expect(state.list[0].isChecked).toBeTruthy();
  });

  test('Проверка изменения элемента (edit)', () => {
    const newTitle = 'Полить цветы';

    const addAction = add(list[0]);
    let state = todoSlice.reducer(todoInitialState, addAction);
    state = todoSlice.reducer(state, addAction);

    const editAction = edit({ id: state.list[0].id, title: newTitle });
    state = todoSlice.reducer(state, editAction);

    expect(state.list[0].title).toEqual(newTitle);
  });
});
