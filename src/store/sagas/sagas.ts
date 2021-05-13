import { push } from 'connected-react-router';
import { takeEvery, call, put, fork } from 'redux-saga/effects';
import api from '../../api';
import {
  IItem,
  REQUEST_STATE_TYPES,
  addAll,
  setRequestState,
  setError,
  initialAuthCheck
} from '../reducers/todoSlice';

export default function* rootSaga() {
  yield takeEvery(initialAuthCheck.type, initialAuthCheckSaga);
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
    yield put(addAll(data as IItem[]));
    yield put(setRequestState(REQUEST_STATE_TYPES.SUCCESS));
  } catch (error) {
    yield put(setError(error.message));
    yield put(setRequestState(REQUEST_STATE_TYPES.ERROR));
  }
}
