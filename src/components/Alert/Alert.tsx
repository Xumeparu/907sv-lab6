import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../store';
import { REQUEST_STATE_TYPES } from '../../store/reducers/todoSlice';

export default function Alert() {
  const requestState = useSelector((state: Store) => state.todo.requestState);
  const error = useSelector((state: Store) => state.todo.error);

  return (
    <div data-testid="alert">
      {requestState === REQUEST_STATE_TYPES.LOADING && <div data-testid="loading">Загрузка...</div>}

      {requestState === REQUEST_STATE_TYPES.ERROR && (
        <div className="errorMessage" data-testid="error">
          {error}
        </div>
      )}
    </div>
  );
}
