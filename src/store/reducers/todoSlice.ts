import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum REQUEST_STATE_TYPES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export interface IItem {
  id: string;
  title: string;
  isChecked: boolean;
}

export type TodoSlice = {
  list: IItem[];
  requestState: REQUEST_STATE_TYPES;
  error: string;
};

export const initialState: TodoSlice = {
  list: [],
  requestState: REQUEST_STATE_TYPES.IDLE,
  error: ''
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IItem>) => {
      state.list.push(action.payload);
    },
    addAll: (state, action: PayloadAction<IItem[]>) => {
      state.list = action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    checked: (state, action: PayloadAction<string>) => {
      state.list = state.list.map(function (item) {
        if (item.id === action.payload) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    },
    edit: (state, action: PayloadAction<{ id: string; title: string }>) => {
      state.list = state.list.map(function (item) {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }
        return item;
      });
    },
    setRequestState: (state, action: PayloadAction<REQUEST_STATE_TYPES>) => {
      state.requestState = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    initialAuthCheck: () => { }
  }
});

export const { add, addAll, remove, checked, edit, setRequestState, setError, initialAuthCheck } = todoSlice.actions;

export default todoSlice;
