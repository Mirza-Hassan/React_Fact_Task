import { render, screen, fireEvent } from "@testing-library/react";
import { FactContext } from "../context/FactProvider";
import FormComponent from "../components/FormComponent";

const mockDispatch = jest.fn();
const mockContextValue: any = { dispatch: mockDispatch, state: { editingFact: null } };

test("renders form component and handles form submission", () => {
  render(
    <FactContext.Provider value={mockContextValue}>
      <FormComponent />
    </FactContext.Provider>
  );

  fireEvent.change(screen.getByPlaceholderText("Enter title..."), { target: { value: "Test Title" } });
  fireEvent.change(screen.getByPlaceholderText("Enter upvotes number between 0 to 100..."), { target: { value: "50" } });
  fireEvent.change(screen.getByPlaceholderText("Enter Date..."), { target: { value: "2023-05-13" } });
  fireEvent.click(screen.getByRole("button", { name: "Add Data" }));

});
