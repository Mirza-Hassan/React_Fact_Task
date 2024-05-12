import { render, screen, fireEvent } from "@testing-library/react";
import { FactContext } from "../context/FactProvider";
import TableComponent from "../components/TableComponent";

const mockDispatch = jest.fn();

const mockContextValue: any = {
  dispatch: mockDispatch,
  state: {
    filteredFacts: [
      { id: 1, title: "Fact 1", upvotes: 10, date: "2023-01-01" },
      { id: 2, title: "Fact 2", upvotes: 20, date: "2023-02-01" },
    ],
  },
};

test("renders TableComponent and handles view, edit, and delete actions", () => {
  render(
    <FactContext.Provider value={mockContextValue}>
      <TableComponent />
    </FactContext.Provider>
  );

  expect(screen.getByText("Fact 1")).toBeInTheDocument();
  expect(screen.getByText("Fact 2")).toBeInTheDocument();

  fireEvent.click(screen.getAllByText("View")[0]);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "VIEW_FACT",
    payload: mockContextValue.state.filteredFacts[0]
  });

  fireEvent.click(screen.getAllByText("Edit")[0]);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "START_EDIT",
    payload: mockContextValue.state.filteredFacts[0]
  });

  fireEvent.click(screen.getAllByText("Delete")[0]);
});

