import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  GET_REFERVOTERS,
  GET_REFERVOTERS_TABLE_COLUMN_NAMES,
  ADD_REFERVOTERS,
  UPDATE_REFERVOTERS,
  DELETE_REFERVOTERS,
  GET_SCREENS,
  GET_DEVICES,
  ON_ACTIVATE_DEACTIVATE_REFERVOTERS,
  GET_TRANSLATION,
} from "./actionTypes";

import {
  activateDeactivateReferVotersFail,
  activateDeactivateReferVotersSuccess,
  addReferVotersFail,
  addReferVotersSuccess,
  deleteReferVotersFail,
  deleteReferVotersSuccess,
  getDevicesFail,
  getDevicesSuccess,
  getReferVotersFail,
  getReferVotersSuccess,
  getReferVotersTableColumnNamesFail,
  getReferVotersTableColumnNamesSuccess,
  getScreensFail,
  getScreensSuccess,
  getTranslationFail,
  getTranslationSuccess,
  updateReferVotersFail,
  updateReferVotersSuccess,
} from "./actions";

import {
  activateDeactivate,
  activateDeactivateReferVoters,
  addReferVoters,
  deleteReferVoters,
  getDevices,
  getReferVoters,
  getReferVotersTableColumnNames,
  getScreens,
  getTranslation,
  updateReferVoters,
} from "../../helpers/fakebackend_helper";

// Fetch ReferVoters
function* fetchReferVoters() {
  try {
    const response = yield call(getReferVoters);
    yield put(getReferVotersSuccess(response.Data));
  } catch (error) {
    yield put(getReferVotersFail(error));
  }
}

// Fetch ReferVoters Table Columns Names
function* fetchReferVotersTableColumnNames(moduleName) {
  try {
    const response = yield call(getReferVotersTableColumnNames, moduleName);
    yield put(getReferVotersTableColumnNamesSuccess(response.Data));
  } catch (error) {
    yield put(getReferVotersTableColumnNamesFail(error));
  }
}

// Add ReferVoters
function* onAddReferVoters({ payload: refervoters }) {
  try {
    const response = yield call(addReferVoters, refervoters);
    yield put(addReferVotersSuccess(response));
  } catch (error) {
    yield put(addReferVotersFail(error));
  }
}

// Update ReferVoters
function* onUpdateReferVoters({ payload: refervoters }) {
  try {
    const response = yield call(updateReferVoters, refervoters);
    yield put(updateReferVotersSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(updateReferVotersFail(error));
  }
}

// Delete ReferVoters
function* onDeleteReferVoters({ payload: refervoters }) {
  try {
    const response = yield call(deleteReferVoters, refervoters);
    yield put(deleteReferVotersSuccess(response));
  } catch (error) {
    yield put(deleteReferVotersFail(error));
  }
}

function* onActivateDeactivate({ payload: refervoters }) {
  try {
    yield put(activateDeactivateReferVotersSuccess(refervoters));
    yield call(activateDeactivateReferVoters, refervoters);
  } catch (error) {
    yield put(activateDeactivateReferVotersFail(error));
  }
}

export function* watchReferVoters() {
  yield takeEvery(GET_REFERVOTERS, fetchReferVoters);
  yield takeEvery(
    GET_REFERVOTERS_TABLE_COLUMN_NAMES,
    fetchReferVotersTableColumnNames
  );
  yield takeEvery(ADD_REFERVOTERS, onAddReferVoters);
  yield takeEvery(UPDATE_REFERVOTERS, onUpdateReferVoters);
  yield takeEvery(DELETE_REFERVOTERS, onDeleteReferVoters);
  yield takeEvery(ON_ACTIVATE_DEACTIVATE_REFERVOTERS, onActivateDeactivate);
}

function* ReferVotersSaga() {
  yield all([fork(watchReferVoters)]);
}

export default ReferVotersSaga;
