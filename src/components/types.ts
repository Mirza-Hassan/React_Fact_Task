import { DBSchema } from "idb";
import { ReactNode } from 'react';
import { FactAction } from '../store/actions';

export interface Fact {
  id?: number;
  title: string;
  upvotes: number;
  date: string;
}

export interface FactDB extends DBSchema {
  facts: {
    key: number;
    value: {
      id: number;
      title: string;
      upvotes: number;
      date: string;
    };
    indexes: { 'by-date': string };
  };
}

export interface FactState {
  facts: Fact[];
  filteredFacts: Fact[];
  selectedFact: Fact | null;
  editingFact: Fact | null;
  showModal: boolean;
  searchTerm: string;
}

export interface FactContextType {
  state: FactState;
  dispatch: React.Dispatch<FactAction>;
}

export interface FactProviderProps {
  children: ReactNode;
}

export interface ModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isVisible: boolean;
}