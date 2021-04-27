import { push } from 'connected-react-router';
import { takeEvery, call, put, fork } from 'redux-saga/effects';
import api from '../../api';
import { REQUEST_STATE_TYPES } from '../reducers/todoSlice';
import { ACTION_TYPES, setError, setRequestState } from '../actions';

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
    yield put(setRequestState(REQUEST_STATE_TYPES.LOADING));
    const data = yield call(api.todo.list);
    yield put({ type: ACTION_TYPES.ADD_ALL, payload: data });
    yield put(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    yield put(setError(error.message));
    yield put(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
}
