import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../hook";
import {
  deleteEmployee,
  EmployeeType,
  fetchEmployees,
  getEmployeesError,
  getEmployeesStatus,
} from "./employeeSlice";
import { selectAllEmployees } from "./employeeSlice";
import styled from "styled-components";
import moment from "moment";

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  :nth-child(even) {
    background-color: #dddddd;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1em 0.5em;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 0.2rem;
`;
export const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employees = useSelector(selectAllEmployees);
  const error = useSelector(getEmployeesError);
  const status = useSelector(getEmployeesStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    try {
      dispatch(deleteEmployee({ id }));
      toast.success("Employee Deleted Successfully", { delay: 1000 });
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete the employee");
    }
  };

  let employee;
  if (status === "loading") {
    employee = <div>loading ....</div>;
  } else if (status === "succeeded") {
    employee = (
      <Table>
        <Tr>
          <Th>No</Th>
          <Th>Name</Th>
          <Th>Salary</Th>
          <Th>Birth-Day</Th>
          <Th>Gender</Th>
          <Th>Action</Th>
        </Tr>
        {employees.map((employee: EmployeeType, i) => (
          <Tr key={employee._id}>
            <Td>{i + 1}</Td>
            <Td>{employee.name}</Td>
            <Td>{employee.salary}</Td>
            <Td>{moment.utc(employee.birthday).format("MM/DD/YYYY")}</Td>
            <Td>{employee.gender}</Td>
            <Td>
              <Box>
                <Box>
                  <Link to={`/employee/${employee._id}`}>View</Link>
                </Box>
                <Box>
                  <Link to={`/editEmployee/${employee._id}`}>Edit</Link>
                </Box>
                <Box>
                  <Button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </Button>
                </Box>
              </Box>
            </Td>
          </Tr>
        ))}
      </Table>
    );
  } else if (status === "failed") {
    employee = <div>{error}</div>;
  }
  return (
    <section>
      <h2>Employee List</h2>
      {employee}
    </section>
  );
};
