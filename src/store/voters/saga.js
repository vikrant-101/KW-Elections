import {
	takeEvery,
	take,
	takeLatest,
	fork,
	put,
	all,
	call,
	throttle
} from "redux-saga/effects";

// Login Redux States
import {
	GET_VOTERS,
	GET_PRINTDETAIL,
	GET_CLASS_VOTERS,
	GET_VOTERS_TABLE_COLUMN_NAMES,
	ADD_VOTERS,
	UPDATE_VOTERS,
	DELETE_VOTERS,
	ON_ACTIVATE_VOTERS,
	ON_ACTIVATE_DEACTIVATE_VOTERS,
} from "./actionTypes";

import {
	activateVotersFail,
	activateVotersSuccess,
	activateDeactivateVotersFail,
	activateDeactivateVotersSuccess,
	addVotersFail,
	addVotersSuccess,
	deleteVotersFail,
	deleteVotersSuccess,
	getVotersFail,
	getVotersSuccess,
	getPrintDetailSuccess,
	getPrintDetailFail,
	getVotersTableColumnNamesFail,
	getVotersTableColumnNamesSuccess,
	updateVotersFail,
	updateVotersSuccess
} from "./actions";

import {
	activateDeactivate,
	activateVoters,
	activateDeactivateVoters,
	addVoters,
	deleteVoters,
	getVoters,
	getPrintDetail,
	getVotersTableColumnNames,
	updateVoters
} from "../../helpers/fakebackend_helper";


// Fetch Voters 
function* fetchVoters({payload: voters}) {
	try {
		const response = yield call(getVoters, voters);
		yield put(getVotersSuccess(response.Data));
	} catch (error) {
		yield put(getVotersFail(error));
	}
}

// Fetch Print Detail
function* fetchPrintDetail(userID) {
	try {
		const response = yield call(getPrintDetail, userID);
		yield put(getPrintDetailSuccess(response.Data));
	} catch (error) {
		yield put(getPrintDetailFail(error));
	}
}

// Fetch Voters Table Columns Names 
function* fetchVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getVotersTableColumnNames, moduleName);
		yield put(getVotersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getVotersTableColumnNamesFail(error));
	}
}



// Add Voters  
function* onAddVoters({ payload: voters }) {
	try {
		const response = yield call(addVoters, voters);
		yield put(addVotersSuccess(response));
	} catch (error) {
		yield put(addVotersFail(error));
	}
}

// Update Voters  
function* onUpdateVoters({ payload: voters }) {
	try {
		const response = yield call(updateVoters, voters);
		yield put(updateVotersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateVotersFail(error));
	}
}

// Delete Voters
function* onDeleteVoters({ payload: voters }) {
	try {
		const response = yield call(deleteVoters, voters);
		yield put(deleteVotersSuccess(response))
	} catch (error) {
		yield put(deleteVotersFail(error))
	}
}

function* onActivateDeactivate({ payload: voters }) {
	try {
		yield put(activateDeactivateVotersSuccess(voters))
		yield call(activateDeactivateVoters, voters);

	} catch (error) {
		yield put(activateDeactivateVotersFail(error))
	}
}

function* onActivateVoters({ payload: voters }) {
	try {
		yield put(activateVotersSuccess(voters))
		yield call(activateVoters, voters);

	} catch (error) {
		yield put(activateVotersFail(error))
	}
}


export function* watchVoters() {
	yield takeEvery(GET_VOTERS, fetchVoters);
	yield takeEvery(GET_PRINTDETAIL, fetchPrintDetail);
	yield takeEvery(GET_VOTERS_TABLE_COLUMN_NAMES, fetchVotersTableColumnNames);
	yield takeEvery(ADD_VOTERS, onAddVoters);
	yield takeEvery(UPDATE_VOTERS, onUpdateVoters);
	yield takeEvery(DELETE_VOTERS, onDeleteVoters);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_VOTERS, onActivateDeactivate);
	yield takeEvery(ON_ACTIVATE_VOTERS, onActivateVoters);

}

function* VotersSaga() {
	yield all([fork(watchVoters)]);
}

export default VotersSaga;