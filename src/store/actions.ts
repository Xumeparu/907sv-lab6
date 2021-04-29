import { push } from 'connected-react-router';
import api from '../api';
import { AppDispatch } from './index';
import {
  REQUEST_STATE_TYPES,
  add,
  remove,
  checked,
  edit,
  setError,
  setRequestState
} from './reducers/todoSlice';

export const addItem = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = await api.todo.add({ title });
    dispatch(add(data));
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

export const removeItem = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestState(REQUEST_STATE_TYPES.LOADING));
    await api.todo.remove({ id });
    dispatch(remove(id));
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
    dispatch(checked(data.id));
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
    dispatch(edit(data));
    dispatch(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
};

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
