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
	getClassVotersFail,
	getClassVotersSuccess,
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
	getClassVoters,
	getVotersTableColumnNames,
	updateVoters
} from "../../helpers/fakebackend_helper";


// Fetch Voters 
function* fetchVoters() {
	try {
		const response = yield call(getVoters);
		yield put(getVotersSuccess(response.Data));
	} catch (error) {
		yield put(getVotersFail(error));
	}
}

// Fetch Voters 
function* fetchClassVoters(ClassNo) {
	try {
		const response = yield call(getClassVoters, ClassNo);
		yield put(getClassVotersSuccess(response.Data));
	} catch (error) {
		yield put(getClassVotersFail(error));
	}
}

// Fetch Voters Table Columns Names 
function* fetchVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getVotersTableColumnNames, moduleName);
		console.log('response column table: ', response);
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
	yield takeEvery(GET_CLASS_VOTERS, fetchClassVoters);
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