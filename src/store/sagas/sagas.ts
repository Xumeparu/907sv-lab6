import { push } from 'connected-react-router';
import { takeEvery, call, put, fork } from 'redux-saga/effects';
import api from '../../api';
import todoSlice, { REQUEST_STATE_TYPES } from '../reducers/todoSlice';
import { ACTION_TYPES } from '../actions';

export default function* rootSaga() {
  yield takeEvery(ACTION_TYPES.INITIAL_AUTH_CHECK, initialAuthCheckSaga);
}

export function* initialAuthCheckSaga() {
  try {
    yield call(api.auth.check);
    yield put(push('/todo'));
    yield fork(getItemsSaga);
  } catch (error) {
    yield put(push('/login'));
  }
}

export function* getItemsSaga(): Generator {
  try {
    yield put(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = yield call(api.todo.list);
    // @ts-ignore
    yield put(todoSlice.actions.addAll(data));
    yield put(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    yield put(todoSlice.actions.setError(error.message));
    yield put(todoSlice.actions.setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
}
