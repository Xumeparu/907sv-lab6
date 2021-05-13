import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SELECT_ITEM_STATE = {
  ALL: 'Все',
  DONE: 'Выполненные',
  NOT_DONE: 'Не выполненные'
} as const;

export type SELECT_ITEM_STATE_TYPE =
  | typeof SELECT_ITEM_STATE.ALL
  | typeof SELECT_ITEM_STATE.DONE
  | typeof SELECT_ITEM_STATE.NOT_DONE;

export type FilterSlice = {
  itemState: SELECT_ITEM_STATE_TYPE;
  substring: string;
};

export const initialState: FilterSlice = {
  itemState: SELECT_ITEM_STATE.ALL,
  substring: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setItemState: (state, action: PayloadAction<SELECT_ITEM_STATE_TYPE>) => {
      state.itemState = action.payload;
    },
    setSubstring: (state, action: PayloadAction<string>) => {
      state.substring = action.payload;
    }
  }
});

export const { setItemState, setSubstring } = filterSlice.actions;

export default filterSlice;
