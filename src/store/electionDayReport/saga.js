import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  GET_ELECTIONDAY_REPORT,
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES,
} from "./actionTypes";

import {
  getElectionDayReportColumnNamesSuccess,
  getElectionDayReportColumnNamesFail,
  getElectionDayReportSuccess,
  getElectionDayReportFail,
} from "./actions";

import {
  getElectionDayReport,
  getElectionDayReportColumnNames,
} from "../../helpers/fakebackend_helper";

// Fetch Election Day Report
function* fetchElectionDayReport({ payload: userId }) {
  try {
    const response = yield call(getElectionDayReport, userId);
    yield put(getElectionDayReportSuccess(response.Data));
  } catch (error) {
    yield put(getElectionDayReportFail(error));
  }
}

// Fetch Election Day Report Columns Names
function* fetchElectionDayReportColumnNames(moduleName) {
  try {
    const response = yield call(getElectionDayReportColumnNames, moduleName);
    yield put(getElectionDayReportColumnNamesSuccess(response.Data));
  } catch (error) {
    yield put(getElectionDayReportColumnNamesFail(error));
  }
}

export function* watchElectionDayReport() {
  yield takeEvery(
    GET_ELECTIONDAY_REPORT_COLUMN_NAMES,
    fetchElectionDayReportColumnNames
  );
  yield takeEvery(GET_ELECTIONDAY_REPORT, fetchElectionDayReport);
}

function* ElectionDayReportSaga() {
  yield all([fork(watchElectionDayReport)]);
}

export default ElectionDayReportSaga;
