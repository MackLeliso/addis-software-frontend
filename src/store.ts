import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import employeeReducer from "./features/employees/employeeSlice";
import rootSaga from "./features/sagas/saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
