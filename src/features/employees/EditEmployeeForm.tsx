import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hook";
import { RootState } from "../../store";
import { selectEmployeeById, updateEmployee } from "./employeeSlice";
import styled from "styled-components";
import Input from "../../components/Input";

const Button = styled.button`
  background-color: #008cba;
  border: none;
  color: white;
  padding: 12px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 0.3rem;
  &:hover {
    background-color: #008cff;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;
const Label = styled.label``;

export const EditEmployeeForm = () => {
  const { employeeId } = useParams() as any;
  const employee = useSelector((state: RootState) =>
    selectEmployeeById(state, employeeId)
  );
  const navigate = useNavigate();

  const [name, setName] = React.useState(employee?.name);
  const [birthday, setBirthday] = React.useState(employee?.birthday);
  const [salary, setSalary] = React.useState(employee?.salary);
  const [gender, setGender] = React.useState(employee?.gender);
  const dispatch = useAppDispatch();
  const onSaveEmployeeClicked = () => {
    if (name && gender && salary && gender) {
      dispatch(
        updateEmployee({ _id: employeeId, name, salary, gender, birthday })
      );
      toast.success("Employee updated successfully");
      navigate("/");
    }
  };
  return (
    <Box>
      <h2> Add a New Employee</h2>
      <form>
        <Box>
          <Input
            required
            type="text"
            label="Name"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            type="number"
            label="Salary"
            value={salary}
            id="salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </Box>
        <Label>Birth-Day</Label>
        <Input
          required
          type="date"
          label=""
          value={birthday}
          id="birthday"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Label>Gender</Label>
        <Input
          required
          type="radio"
          label="male"
          value={gender}
          name="gender"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          required
          type="radio"
          label="female"
          value={gender}
          name="gender"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <Button onClick={onSaveEmployeeClicked}>Save</Button>
      </form>
    </Box>
  );
};
