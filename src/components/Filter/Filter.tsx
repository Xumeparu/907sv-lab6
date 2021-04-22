import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store';
import { SELECT_FILTER_TYPE, SELECT_FILTER_TYPES } from '../../store/reducers/filterSlice';
import { ACTION_TYPES } from '../../store/actions';

export default function Filter() {
  const dispatch = useDispatch();
  const substring = useSelector((state: Store) => state.filter.substring);

  function filterHandler(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: e.target.value as SELECT_FILTER_TYPE
    });
  }

  function searchStringHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ACTION_TYPES.SELECT_BY_SEARCH_STRING,
      payload: e.target.value
    });
  }

  return (
    <>
      <select className="filter" data-testid="selector" onChange={filterHandler}>
        {Object.keys(SELECT_FILTER_TYPES).map((item, index) => (
          <option
            data-testid="option"
            key={index}
            value={Object.values(SELECT_FILTER_TYPES)[index]}
          >
            {Object.values(SELECT_FILTER_TYPES)[index]}
          </option>
        ))}
      </select>
      <input
        className="searchString"
        data-testid="searchString"
        value={substring}
        onChange={searchStringHandler}
      />
    </>
  );
}
