import styled from "styled-components";
import { useContext, useEffect } from "react";
import FormComponent from "./components/FormComponent";
import SearchComponent from "./components/SearchComponent";
import TableComponent from "./components/TableComponent";
import FactModal from "./components/FactModal";
import { FactContext } from "./context/FactProvider";

const App = () => {
  const { dispatch } = useContext(FactContext);
  return (
    <PageContainer>
      <FormSection>
        <FormComponent />
      </FormSection>
      <MainSection>
        <SearchComponent />
        <Container>
          <Label>SORT BY</Label>
          <Button onClick={() => dispatch({ type: "SORT_BY_UPVOTES" })}>
            Most Upvoted
          </Button>
          <Button onClick={() => dispatch({ type: "SORT_BY_DATE" })}>
            Most Recent
          </Button>
        </Container>
        <TableComponent />
        <FactModal />
      </MainSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const FormSection = styled.div`
  width: 40%;
  padding: 20px;
  border-right: 2px solid #ddd;
  background-color: #f7f7f7;
`;

const MainSection = styled.div`
  width: 60%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Label = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export default App;
