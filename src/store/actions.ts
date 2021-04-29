import { push } from 'connected-react-router';
import api from '../api';
import { AppDispatch } from './index';
import todoSlice, { REQUEST_STATE_TYPES } from './reducers/todoSlice';
import { SELECT_FILTER_TYPE } from './reducers/filterSlice';

export const ACTION_TYPES = {
  SELECT_BY_FILTER: 'selectByFilter',
  SELECT_BY_SEARCH_STRING: 'selectBySearchString',
  INITIAL_AUTH_CHECK: 'initialAuthCheck'
} as const;

export type ACTION_TYPE =
  | typeof ACTION_TYPES.SELECT_BY_FILTER
  | typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING
  | typeof ACTION_TYPES.INITIAL_AUTH_CHECK;

export type IAction =
  | IActionSelectByFilter
  | IActionSelectBySearchString
  | IActionInitialAuthCheck;

export interface IActionSelectByFilter {
  type: typeof ACTION_TYPES.SELECT_BY_FILTER;
  payload: SELECT_FILTER_TYPE;
}

export interface IActionSelectBySearchString {
  type: typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING;
  payload: string;
}

export interface IActionInitialAuthCheck {
  type: typeof ACTION_TYPES.INITIAL_AUTH_CHECK;
}

export const addItem = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.add({ title });
    dispatch(todoSlice.actions.add(data));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const removeItem = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.todo.remove({ id });
    dispatch(todoSlice.actions.remove(id));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const checkedItem = (id: string, isChecked: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.checked({ id, isChecked });
    dispatch(todoSlice.actions.checked(data.id));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const editItem = (id: string, title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.edit({ id, title });
    dispatch(todoSlice.actions.edit(data));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const initialAuthCheck = () => ({
  type: ACTION_TYPES.INITIAL_AUTH_CHECK
});

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.auth.login(username, password);
    dispatch(push('/todo'));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.auth.logout();
    dispatch(push('/login'));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(todoSlice.actions.setError(error.message));
    dispatch(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};
