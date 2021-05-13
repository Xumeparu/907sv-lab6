import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store';
import {
  SELECT_ITEM_STATE_TYPE,
  SELECT_ITEM_STATE,
  setItemState,
  setSubstring
} from '../../store/reducers/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const substring = useSelector((state: Store) => state.filter.substring);

  function filterHandler(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(setItemState(e.target.value as SELECT_ITEM_STATE_TYPE));
  }

  function searchStringHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setSubstring(e.target.value));
  }

  return (
    <div>
      <select className="filter" data-testid="selector" onChange={filterHandler}>
        {Object.keys(SELECT_ITEM_STATE).map((item, index) => (
          <option data-testid="option" key={index} value={Object.values(SELECT_ITEM_STATE)[index]}>
            {Object.values(SELECT_ITEM_STATE)[index]}
          </option>
        ))}
      </select>
      <input
        className="searchString"
        data-testid="searchString"
        value={substring}
        onChange={searchStringHandler}
      />
    </div>
  );
}
