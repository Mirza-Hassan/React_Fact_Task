import { openDB } from "idb";
import { FactDB } from '../components/types';

export const initDB = async () => {
  return openDB<FactDB>('FactDB', 1, {
    upgrade(db) {
      const store = db.createObjectStore('facts', {
        keyPath: 'id',
        autoIncrement: true
      });
      store.createIndex('by-date', 'date');
    }
  });
};

export const addFact = async (fact: any) => {
  const db = await initDB();
  return db.add('facts', fact);
};

export const updateFact = async (fact: any) => {
  const db = await initDB();
  return db.put('facts', fact);
};

export const deleteFact = async (id: any) => {
  const db = await initDB();
  return db.delete('facts', id);
};

export const getAllFacts = async () => {
  const db = await initDB();
  return db.getAll('facts');
};
