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
	GET_AREANAME,
	GET_FAMILYNAME,
	GET_NEXT_VOTERS
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
	updateVotersSuccess,
	getAreaNameFail,
	getAreaNameSuccess,
	getFamilyNameFail,
	getFamilyNameSuccess,
	getNextVotersFail,
	getNextVotersSuccess
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
	updateVoters,
	getAreaName,
	getFamilyName,
	getNextVoters
} from "../../helpers/fakebackend_helper";


// Fetch Voters 
function* fetchVoters({payload: searchQuery}) {
	console.log('searchQuery: ', searchQuery);
	try {
		const response = yield call(getVoters, searchQuery);
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

// Fetch AreaName
function* fetchAreaName({payload: userID}) {
	try {
		const response = yield call(getAreaName, userID);
		yield put(getAreaNameSuccess(response.Data));
	} catch (error) {
		yield put(getAreaNameFail(error));
	}
}

// Fetch FamilyName
function* fetchFamilyName({payload: userID}) {
	try {
		const response = yield call(getFamilyName, userID);
		yield put(getFamilyNameSuccess(response.Data));
	} catch (error) {
		yield put(getFamilyNameFail(error));
	}
}

// Fetch Next Voters 
function* fetchNextVoters({payload: nextVoters}) {
	console.log('nextVoters: ', nextVoters);
	try {
		const response = yield call(getNextVoters, nextVoters);
		yield put(getNextVotersSuccess(response.Data));
	} catch (error) {
		yield put(getNextVotersFail(error));
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
	yield takeEvery(GET_AREANAME, fetchAreaName);
	yield takeEvery(GET_FAMILYNAME, fetchFamilyName);
	yield takeEvery(GET_NEXT_VOTERS, fetchNextVoters);

}

function* VotersSaga() {
	yield all([fork(watchVoters)]);
}

export default VotersSaga;