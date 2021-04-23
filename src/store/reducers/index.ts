import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import todoReducer from './todoSlice';
import filterReducer from './filterSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    todo: todoReducer,
    filter: filterReducer,
    router: connectRouter(history)
  });

export default createRootReducer;
