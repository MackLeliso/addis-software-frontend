import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EmployeeList } from "./features/employees/EmployeeList";
import PageNotFound from "./components/PageNotFound/index.jsx";
import { AddEmployeeForm } from "./features/employees/AddEmployeeForm";
import { SingleEmployeePage } from "./features/employees/SingleEmployeePage";
import { EditEmployeeForm } from "./features/employees/EditEmployeeForm";
import { Navbar } from "./components/Navbar";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;

const Section = styled.section``;
const App = () => (
  <Section>
    <Navbar />{" "}
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <EmployeeList /> <AddEmployeeForm />
            </Container>
          }
        ></Route>
        <Route
          path="/employee/:employeeId"
          element={<SingleEmployeePage />}
        ></Route>
        <Route
          path="editEmployee/:employeeId"
          element={<EditEmployeeForm />}
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </Section>
);

export default App;
