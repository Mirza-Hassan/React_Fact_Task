import { render, screen, fireEvent } from "@testing-library/react";
import { FactContext } from "../context/FactProvider";
import SearchComponent from "../components/SearchComponent";

const mockDispatch = jest.fn();

const mockContextValue: any = {
  dispatch: mockDispatch,
  state: { searchTerm: "" },
};

test("renders search component and handles input change", () => {
  render(
    <FactContext.Provider value={mockContextValue}>
      <SearchComponent />
    </FactContext.Provider>
  );

  const inputField = screen.getByPlaceholderText("Search the record...");
  expect(inputField).toBeInTheDocument();

  fireEvent.change(inputField, { target: { value: "example search" } });
  expect(inputField).toHaveValue("example search");

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_SEARCH_TERM",
    payload: "example search",
  });
});
