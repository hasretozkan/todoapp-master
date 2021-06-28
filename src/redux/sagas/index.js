import { takeLatest, put } from "redux-saga/effects";

function* setToDoList() {
  yield put({ type: "SET_TODO", value: [] });
}

export function* watchToDo() {
  yield takeLatest("SET_TODO", setToDoList);
}
