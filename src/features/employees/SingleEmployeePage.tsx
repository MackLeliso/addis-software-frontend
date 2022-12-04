import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectEmployeeById } from "./employeeSlice";
import styled from "styled-components";
import moment from "moment";

const Box = styled.div`
  display: flex;
  flex-direction: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
`;
export const SingleEmployeePage = ({ match }: { match?: any }) => {
  const { employeeId } = useParams();
  const employee = useSelector((state: RootState) =>
    selectEmployeeById(state, employeeId)
  );

  if (!employee) {
    return (
      <section>
        <h2>Employee not found!</h2>
      </section>
    );
  }
  return (
    <section key={employee._id}>
      <h2>Employee description</h2>
      <Box>
        <Box>
          <h2>Name: </h2>
          <p>{employee.name}</p>
        </Box>
        <Box>
          <h2>Salary: </h2>
          <p>{employee.salary}</p>
        </Box>
        <Box>
          <h2>Birth-Day: </h2>
          <p>{moment.utc(employee.birthday).format("MM/DD/YYYY")}</p>
        </Box>
        <Box>
          <h2>Gender: </h2>
          <p>{employee.gender}</p>
        </Box>
      </Box>
    </section>
  );
};
