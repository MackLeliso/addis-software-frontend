import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../http-common";
import { RootState } from "../../store";

export interface EmployeeType {
  _id: string;
  name?: string;
  gender?: string;
  birthday?: string;
  salary: number | string;
}
const initialState: {
  employees: Array<EmployeeType>;
  status: string;
  error: string | null | undefined;
} = {
  employees: [],
  status: "idle",
  error: null,
};

export const addNewEmployee = createAsyncThunk(
  "/employees/addEmployee",
  async (initialEmployee: Omit<EmployeeType, "_id">) => {
    try {
      const response = await http.post("employee", initialEmployee);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "/employee/updateEmployee",
  async (initialEmployee: EmployeeType) => {
    const { _id, ...data } = initialEmployee;
    try {
      const response = await http.patch(`employee/${_id}`, data);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  "/employee/fetchEmployees",
  async () => {
    const { data } = await http.get("employee");
    return data as Array<EmployeeType>;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (employeeId: string) => {
    const response = await http.get(`employee/${employeeId}`);
    console.log(response);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async ({ id }: { id: string }) => {
    try {
      const response = await http.delete(`employee/${id}`);
      if (response?.status === 200) return { id };
      return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
      return error.message;
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<Array<EmployeeType>>) => {
      state.employees = [...state.employees, ...action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const { _id, name, salary, gender, birthday } = action.payload;
        const employee = state.employees.find(
          (employee) => employee._id === _id
        );
        if (employee) {
          employee.name = name;
          employee.salary = salary;
          employee.birthday = birthday;
          employee.gender = gender;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        if (!action?.payload.id) {
          console.log("could not delete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const OldEmployees = state.employees.filter(
          (employee) => employee._id !== id
        );
        state.employees = OldEmployees;
      });
  },
});

export const { setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;

export const selectAllEmployees = (state: RootState) =>
  state.employee.employees;
export const getEmployeesError = (state: RootState) => state.employee.error;
export const getEmployeesStatus = (state: RootState) => state.employee.status;

export const selectEmployeeById = (
  state: RootState,
  employeeId: string | undefined
) =>
  state.employee.employees.find((employee: any) => employee._id === employeeId);
