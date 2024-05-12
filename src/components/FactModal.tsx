import { useContext } from "react";
import styled from "styled-components";
import { FactContext } from '../context/FactProvider';

const FactModal = () => {
  const { state, dispatch } = useContext(FactContext);
  const { selectedFact } = state;

  if (!selectedFact) return null;

  return (
    <ModalOverlay onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Fact Details</Title>
        <Detail><Label>Title:</Label> {selectedFact.title}</Detail>
        <Detail><Label>Upvotes:</Label> {selectedFact.upvotes}</Detail>
        <Detail><Label>Date:</Label> {new Date(selectedFact.date).toLocaleDateString()}</Detail>
        <CloseButton onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Detail = styled.div`
  margin: 8px 0;
  font-size: 16px;
  text-align: left;
`;

const Label = styled.span`
  font-weight: bold;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

export default FactModal;
