import styled from "styled-components";
import { ModalProps } from "./types";

const DeleteModal = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isVisible,
}: ModalProps) => {
  if (!isVisible) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalMessage>{message}</ModalMessage>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
        <Button onClick={onCancel} style={{ backgroundColor: "#007bff" }}>
          {cancelLabel}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const ModalMessage = styled.p`
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #dc3545; 
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

