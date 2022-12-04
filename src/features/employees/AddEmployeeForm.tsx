import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import { addNewEmployee } from "./employeeSlice";
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
export const AddEmployeeForm = () => {
  const [name, setName] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [addRequestStatus, setAddRequestStatus] = React.useState("idle");
  const dispatch = useDispatch<AppDispatch>();

  const canSave =
    [name, birthday, salary, gender].every(Boolean) &&
    addRequestStatus === "idle";
  const onSaveEmployeeClicked = async () => {
    if (canSave) {
      try {
        console.log({ name, birthday, salary: Number(salary), gender });
        setAddRequestStatus("pending");
        dispatch(
          addNewEmployee({ name, birthday, salary: Number(salary), gender })
        ).unwrap();
        toast.success("Employee added successfully");
        setName("");
        setBirthday("");
        setSalary("");
        setGender("");
      } catch (error) {
        toast.error("Failed to add employee");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2> Add a New Employee</h2>
      <form>
        <Input
          required
          type="text"
          label="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          required
          type="number"
          label="Salary"
          id="salary"
          onChange={(e) => setSalary(e.target.value)}
        />
        <Label>Birth-Day</Label>
        <Input
          required
          type="date"
          label=""
          id="birthday"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Label>Gender</Label>
        <Input
          required
          type="radio"
          label="male"
          value="male"
          name="gender"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <Input
          required
          type="radio"
          label="female"
          value="female"
          name="gender"
          id="gender"
          onChange={(e) => setGender(e.target.value)}
        />
        <Button onClick={onSaveEmployeeClicked} disabled={!canSave}>
          Save
        </Button>
      </form>
    </section>
  );
};
