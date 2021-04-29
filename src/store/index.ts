import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import todoSlice, { TodoSlice, REQUEST_STATE_TYPES } from './reducers/todoSlice';
import filterSlice, { FilterSlice, SELECT_ITEM_STATE } from './reducers/filterSlice';
import rootSaga from './sagas/sagas';

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
  itemState: SELECT_ITEM_STATE.ALL,
  substring: ''
};

export const initialState: Store = {
  todo: todoInitialState,
  filter: filterInitialState
};

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    filter: filterSlice.reducer,
    router: connectRouter(history)
  },
  middleware: [thunkMiddleware, routerMiddleware(history), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export default store;
