import { all, put, select, takeLatest } from "redux-saga/effects";
import { setEmployee, addNewEmployee } from "../employees/employeeSlice";
import { sagaActions } from "./sagaActions";

export function* workAddEmployee(): any {
  try {
    let result = yield select(addNewEmployee);
    yield put(setEmployee(result));
  } catch (error: any) {
    yield put({
      type: sagaActions.EMPLOYEE_ADD_FAILED,
      message: error.message,
    });
  }
}

function* watchAddEmployee() {
  yield takeLatest(setEmployee, workAddEmployee);
}

export default function* rootSaga() {
  yield all([watchAddEmployee()]);
}
