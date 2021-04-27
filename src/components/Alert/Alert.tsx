import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { REQUEST_STATE_TYPES } from '../../store/reducers/todoSlice';

export default function Alert() {
  const requestState = useSelector((state: Store) => state.todo.requestState);
  const error = useSelector((state: Store) => state.todo.error);

  return (
    <>
      {requestState === REQUEST_STATE_TYPES.LOADING && (
        <>
          <div>Загрузка...</div>
        </>
      )}

      {requestState === REQUEST_STATE_TYPES.ERROR && (
        <>
          <div className="errorMessage">{error}</div>
        </>
      )}
    </>
  );
}
