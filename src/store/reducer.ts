import { FactState } from "../components/types";
import { FactAction } from "./actions";
import { updateFact, deleteFact } from "../config/db";

export const initialState: FactState = {
  facts: [],
  filteredFacts: [],
  selectedFact: null,
  editingFact: null,
  showModal: false,
  searchTerm: "",
};

export const factReducer = (
  state = initialState,
  action: FactAction
): FactState => {
  switch (action.type) {
    case "LOAD_FACTS":
      return { ...state, facts: action.payload, filteredFacts: action.payload };
    case "ADD_FACT":
      return {
        ...state,
        facts: [...state.facts, action.payload],
        filteredFacts: [...state.facts, action.payload],
      };
    case "EDIT_FACT":
      return {
        ...state,
        facts: state.facts.map((fact) =>
          fact.id === action.payload.id ? action.payload : fact
        ),
        editingFact: null,
        filteredFacts: state.facts.map((fact) =>
          fact.id === action.payload.id ? action.payload : fact
        ),
      };
    case "DELETE_FACT":
      return {
        ...state,
        facts: state.facts.filter((fact) => fact.id !== action.payload),
        filteredFacts: state.filteredFacts.filter(
          (fact) => fact.id !== action.payload
        ),
      };

    case "VIEW_FACT":
      return { ...state, selectedFact: action.payload, showModal: true };

    case "CLOSE_MODAL":
      return { ...state, showModal: false, selectedFact: null };

    case "START_EDIT":
      return { ...state, editingFact: action.payload };

    case "SET_SEARCH_TERM":
      const filtered =
        action.payload.length >= 3
          ? state.facts.filter((fact) =>
              fact.title.toLowerCase().includes(action.payload.toLowerCase())
            )
          : state.facts;
      return { ...state, searchTerm: action.payload, filteredFacts: filtered };

    case "SORT_BY_UPVOTES":
      return {
        ...state,
        filteredFacts: [...state.facts].sort((a, b) => b.upvotes - a.upvotes),
      };

    case "SORT_BY_DATE":
      return {
        ...state,
        filteredFacts: [...state.facts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      };

    default:
      return state;
  }
};

export default initialState;
