import styled from "styled-components";
import { useContext, useState } from "react";
import { FactContext } from "../context/FactProvider";

const SearchComponent = () => {
  const { dispatch } = useContext(FactContext);
  const [term, setTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
    dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
  };

  return (
    <Search>
      <Input
        type="text"
        value={term}
        onChange={handleChange}
        placeholder="Search the record..."
      />
    </Search>
  );
};

const Search = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width: 50%;
`;

export default SearchComponent;
