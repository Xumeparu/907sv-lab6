import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { TodoSlice, REQUEST_STATE_TYPES } from './reducers/todoSlice';
import { FilterSlice, SELECT_FILTER_TYPES } from './reducers/filterSlice';

export type Store = {
  todo: TodoSlice;
  filter: FilterSlice;
};

export const todoInitialState: TodoSlice = {
  list: [],
  requestState: REQUEST_STATE_TYPES.IDLE,
  error: ''
};

export const filterInitialState: FilterSlice = {
  itemState: SELECT_FILTER_TYPES.ALL,
  substring: ''
};

export const initialState: Store = {
  todo: todoInitialState,
  filter: filterInitialState
};

export { rootReducer };
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;
export default store;
