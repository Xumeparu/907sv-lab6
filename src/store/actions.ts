import { push } from 'connected-react-router';
import api from '../api';
import { AppDispatch } from './index';
import { IItem, REQUEST_STATE_TYPES } from './reducers/todoSlice';
import { SELECT_FILTER_TYPE } from './reducers/filterSlice';

export const ACTION_TYPES = {
  ADD: 'add',
  ADD_ALL: 'addAll',
  REMOVE: 'remove',
  CHECKED: 'checked',
  EDIT: 'edit',
  SELECT_BY_FILTER: 'selectByFilter',
  SELECT_BY_SEARCH_STRING: 'selectBySearchString',
  SET_REQUEST_STATE: 'setRequestState',
  SET_ERROR: 'setError',
  INITIAL_AUTH_CHECK: 'initialAuthCheck'
} as const;

export type ACTION_TYPE =
  | typeof ACTION_TYPES.ADD
  | typeof ACTION_TYPES.ADD_ALL
  | typeof ACTION_TYPES.EDIT
  | typeof ACTION_TYPES.REMOVE
  | typeof ACTION_TYPES.CHECKED
  | typeof ACTION_TYPES.SELECT_BY_FILTER
  | typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING
  | typeof ACTION_TYPES.SET_REQUEST_STATE
  | typeof ACTION_TYPES.SET_ERROR
  | typeof ACTION_TYPES.INITIAL_AUTH_CHECK;

export type IAction =
  | IActionAdd
  | IActionAddAll
  | IActionRemove
  | IActionChecked
  | IActionEdit
  | IActionSelectByFilter
  | IActionSelectBySearchString
  | IActionSetRequestState
  | IActionSetError
  | IActionInitialAuthCheck;

export interface IActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: IItem;
}

export interface IActionAddAll {
  type: typeof ACTION_TYPES.ADD_ALL;
  payload: IItem[];
}

export interface IActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface IActionChecked {
  type: typeof ACTION_TYPES.CHECKED;
  payload: string;
}

export interface IActionEdit {
  type: typeof ACTION_TYPES.EDIT;
  payload: {
    id: string;
    title: string;
  };
}

export interface IActionSelectByFilter {
  type: typeof ACTION_TYPES.SELECT_BY_FILTER;
  payload: SELECT_FILTER_TYPE;
}

export interface IActionSelectBySearchString {
  type: typeof ACTION_TYPES.SELECT_BY_SEARCH_STRING;
  payload: string;
}

export interface IActionSetRequestState {
  type: typeof ACTION_TYPES.SET_REQUEST_STATE;
  payload: REQUEST_STATE_TYPES;
}

export interface IActionSetError {
  type: typeof ACTION_TYPES.SET_ERROR;
  payload: string;
}

export interface IActionInitialAuthCheck {
  type: typeof ACTION_TYPES.INITIAL_AUTH_CHECK;
}

export const setRequestState = (requestState: REQUEST_STATE_TYPES) => ({
  type: ACTION_TYPES.SET_REQUEST_STATE,
  payload: requestState
});

export const setError = (error: string) => ({
  type: ACTION_TYPES.SET_ERROR,
  payload: error
});

export const addItem = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.add({ title });
    dispatch({ type: ACTION_TYPES.ADD, payload: data });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const removeItem = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.remove({ id });
    dispatch({ type: ACTION_TYPES.REMOVE, payload: id });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const checkedItem = (id: string, isChecked: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.checked({ id, isChecked });
    dispatch({ type: ACTION_TYPES.CHECKED, payload: data.id });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const editItem = (id: string, title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.edit({ id, title });
    dispatch({ type: ACTION_TYPES.EDIT, payload: data });
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const initialAuthCheck = () => ({
  type: ACTION_TYPES.INITIAL_AUTH_CHECK
});

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.auth.login(username, password);
    dispatch(push('/todo'));
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.auth.logout();
    dispatch(push('/login'));
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};
