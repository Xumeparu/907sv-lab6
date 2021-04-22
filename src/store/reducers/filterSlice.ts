import { ACTION_TYPES, IAction } from '../actions';

export const SELECT_FILTER_TYPES = {
  ALL: 'Все',
  DONE: 'Выполненные',
  NOT_DONE: 'Не выполненные'
} as const;

export type SELECT_FILTER_TYPE =
  | typeof SELECT_FILTER_TYPES.ALL
  | typeof SELECT_FILTER_TYPES.DONE
  | typeof SELECT_FILTER_TYPES.NOT_DONE;

export type FilterSlice = {
  itemState: SELECT_FILTER_TYPE;
  substring: string;
};

export const filterInitialState: FilterSlice = {
  itemState: SELECT_FILTER_TYPES.ALL,
  substring: ''
};

export default function filterReducer(state = filterInitialState, action: IAction): FilterSlice {
  switch (action.type) {
    case ACTION_TYPES.SELECT_BY_FILTER: {
      return { ...state, itemState: action.payload };
    }
    case ACTION_TYPES.SELECT_BY_SEARCH_STRING: {
      return { ...state, substring: action.payload };
    }
    default:
      return state;
  }
}
