import { ACTION_TYPES, IAction } from '../actions';

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

export const todoInitialState: TodoSlice = {
  list: [],
  requestState: REQUEST_STATE_TYPES.IDLE,
  error: ''
};

export default function todoReducer(state = todoInitialState, action: IAction): TodoSlice {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return { ...state, list: [...state.list, action.payload] };
    }
    case ACTION_TYPES.ADD_ALL: {
      return { ...state, list: [...action.payload] };
    }
    case ACTION_TYPES.REMOVE: {
      return { ...state, list: [...state.list.filter(item => item.id !== action.payload)] };
    }
    case ACTION_TYPES.CHECKED: {
      return {
        ...state,
        list: [
          ...state.list.map(function (item) {
            if (item.id === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }
    case ACTION_TYPES.EDIT: {
      return {
        ...state,
        list: [
          ...state.list.map(function (item) {
            if (item.id === action.payload.id) {
              return { ...item, title: action.payload.title };
            }
            return item;
          })
        ]
      };
    }
    case ACTION_TYPES.SET_REQUEST_STATE: {
      return { ...state, requestState: action.payload };
    }
    case ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
}
