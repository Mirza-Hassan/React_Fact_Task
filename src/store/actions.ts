import { Fact } from '../components/types';

export type FactAction =
  | { type: "LOAD_FACTS"; payload: Fact[] }
  | { type: "ADD_FACT"; payload: Fact }
  | { type: "EDIT_FACT"; payload: Fact }
  | { type: "DELETE_FACT"; payload: number }
  | { type: "VIEW_FACT"; payload: Fact }
  | { type: "CLOSE_MODAL" }
  | { type: "START_EDIT"; payload: Fact }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SORT_BY_UPVOTES" }
  | { type: "SORT_BY_DATE" };
