import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { FactContext } from "../context/FactProvider";
import { addFact, updateFact } from "../config/db";

const FormComponent = () => {
  const { state, dispatch } = useContext(FactContext);
  const [title, setTitle] = useState("");
  const [upvotes, setUpvotes] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (state.editingFact) {
      setTitle(state.editingFact.title);
      setUpvotes(state.editingFact.upvotes);
      setDate(state.editingFact.date);
      setCurrentId(state.editingFact.id || null);
    } else {
      clearForm();
    }
  }, [state.editingFact]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (currentId !== null) {
        await updateFact({
          id: currentId,
          title,
          upvotes: Number(upvotes),
          date,
        });
        dispatch({
          type: "EDIT_FACT",
          payload: { id: currentId, title, upvotes: Number(upvotes), date },
        });
      } else {
        const factId = await addFact({ title, upvotes: Number(upvotes), date });
        const newFact = { id: factId, title, upvotes: Number(upvotes), date };
        dispatch({ type: "ADD_FACT", payload: newFact });
      }
      clearForm();
    } catch (e) {
      //Error processing fact
    }
  };

  const clearForm = () => {
    setTitle("");
    setUpvotes("");
    setDate("");
    setCurrentId(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>Add Record</Heading>
      <Label>
        Title:
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          required
        />
      </Label>
      <Label>
        Upvotes:
        <Input
          type="number"
          value={upvotes}
          onChange={(e) => setUpvotes(Number(e.target.value))}
          placeholder="Enter upvotes number between 0 to 100..."
          required
        />
      </Label>
      <Label>
        Date:
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter Date..."
          required
        />
      </Label>
      <Button type="submit">
        {currentId !== null ? "Save Edits" : "Add Data"}
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #218838;
  }
`;

export default FormComponent;
