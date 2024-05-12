import styled from "styled-components";
import { useState, useContext } from "react";
import { FactContext } from "../context/FactProvider";
import DeleteModal from "./DeleteModal";
import { deleteFact } from "../config/db";

const TableComponent = () => {
  const { state, dispatch } = useContext(FactContext);
  const [factToDelete, setFactToDelete] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setFactToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (factToDelete !== null) {
      try {
        await deleteFact(factToDelete);
        dispatch({ type: "DELETE_FACT", payload: factToDelete });
        setFactToDelete(null);
      } catch (e) {
        // Error deleting fact with ID
      }
    }
  };

  const cancelDelete = () => {
    setFactToDelete(null);
  };

  return (
    <>
      <Container>
        <HeaderRow>
          <Cell>Title</Cell>
          <Cell>Upvotes</Cell>
          <Cell>Date</Cell>
          <Cell>Actions</Cell>
        </HeaderRow>
        {state.filteredFacts.map((fact) => (
          <Row key={fact.id}>
            <Cell>{fact.title}</Cell>
            <Cell>{fact.upvotes}</Cell>
            <Cell>{new Date(fact.date).toLocaleDateString()}</Cell>
            <ButtonGroup>
              <Button
                onClick={() => dispatch({ type: "VIEW_FACT", payload: fact })}
              >
                View
              </Button>
              <Button
                onClick={() => dispatch({ type: "START_EDIT", payload: fact })}
              >
                Edit
              </Button>
              <Button onClick={() => confirmDelete(fact.id!)}>Delete</Button>
            </ButtonGroup>
          </Row>
        ))}
      </Container>
      <DeleteModal
        title="Delete Confirmation"
        message="Are you sure you want to delete this fact?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={cancelDelete}
        isVisible={factToDelete !== null}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  &:nth-child(even) {
    background-color: #f3f3f3;
  }
`;

const HeaderRow = styled(Row)`
  font-weight: bold;
  border-bottom: 2px solid #d0d0d0;
`;

const Cell = styled.div`
  flex: 1;
  text-align: left;
  padding: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
  &:nth-child(2) {
    background-color: #007bff;
  }
  &:nth-child(3) {
    background-color: #f44336;
  }
`;

export default TableComponent;
