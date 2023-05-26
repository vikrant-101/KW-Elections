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
	GET_BOOTHVOTERS,
	GET_BOOTHUSER_DETAIL,
	GET_CLASS_BOOTHVOTERS,
	GET_BOOTHVOTERS_TABLE_COLUMN_NAMES,
	ADD_BOOTHVOTERS,
	UPDATE_BOOTHVOTERS,
	DELETE_BOOTHVOTERS,
	ON_ACTIVATE_BOOTHVOTERS,
	ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS,
} from "./actionTypes";

import {
	activateBoothVotersFail,
	activateBoothVotersSuccess,
	activateDeactivateBoothVotersFail,
	activateDeactivateBoothVotersSuccess,
	addBoothVotersFail,
	addBoothVotersSuccess,
	deleteBoothVotersFail,
	deleteBoothVotersSuccess,
	getBoothVotersFail,
	getBoothVotersSuccess,
	getBoothUserDetailFail,
	getBoothUserDetailSuccess,
	getClassBoothVotersFail,
	getClassBoothVotersSuccess,
	getBoothVotersTableColumnNamesFail,
	getBoothVotersTableColumnNamesSuccess,
	updateBoothVotersFail,
	updateBoothVotersSuccess
} from "./actions";

import {
	activateDeactivate,
	activateBoothVoters,
	activateDeactivateBoothVoters,
	addBoothVoters,
	deleteBoothVoters,
	getBoothVoters,
	getBoothUserDetail,
	getClassBoothVoters,
	getBoothVotersTableColumnNames,
	updateBoothVoters
} from "../../helpers/fakebackend_helper";


// Fetch BoothVoters 
function* fetchBoothVoters({payload: boothvoters }) {
	try {
		const response = yield call(getBoothVoters, boothvoters);
		yield put(getBoothVotersSuccess(response.Data));
	} catch (error) {
		yield put(getBoothVotersFail(error));
	}
}

// Fetch BoothVoters 
function* fetchBoothUserDetail(userID) {
	try {
		const response = yield call(getBoothUserDetail, userID);
		yield put(getBoothUserDetailSuccess(response.Data));
	} catch (error) {
		yield put(getBoothUserDetailFail(error));
	}
}

// Fetch Booth User Detail
function* fetchClassBoothVoters(ClassNo) {
	try {
		const response = yield call(getClassBoothVoters, ClassNo);
		yield put(getClassBoothVotersSuccess(response.Data));
	} catch (error) {
		yield put(getClassBoothVotersFail(error));
	}
}

// Fetch BoothVoters Table Columns Names 
function* fetchBoothVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getBoothVotersTableColumnNames, moduleName);
		yield put(getBoothVotersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getBoothVotersTableColumnNamesFail(error));
	}
}



// Add BoothVoters  
function* onAddBoothVoters({ payload: boothvoters }) {
	try {
		const response = yield call(addBoothVoters, boothvoters);
		yield put(addBoothVotersSuccess(response));
	} catch (error) {
		yield put(addBoothVotersFail(error));
	}
}

// Update BoothVoters  
function* onUpdateBoothVoters({ payload: boothvoters }) {
	try {
		const response = yield call(updateBoothVoters, boothvoters);
		yield put(updateBoothVotersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateBoothVotersFail(error));
	}
}

// Delete BoothVoters
function* onDeleteBoothVoters({ payload: boothvoters }) {
	try {
		const response = yield call(deleteBoothVoters, boothvoters);
		yield put(deleteBoothVotersSuccess(response))
	} catch (error) {
		yield put(deleteBoothVotersFail(error))
	}
}

function* onActivateDeactivate({ payload: boothvoters }) {
	try {
		yield put(activateDeactivateBoothVotersSuccess(boothvoters))
		yield call(activateDeactivateBoothVoters, boothvoters);

	} catch (error) {
		yield put(activateDeactivateBoothVotersFail(error))
	}
}

function* onActivateBoothVoters({ payload: boothvoters }) {
	try {
		yield put(activateBoothVotersSuccess(boothvoters))
		yield call(activateBoothVoters, boothvoters);

	} catch (error) {
		yield put(activateBoothVotersFail(error))
	}
}


export function* watchBoothVoters() {
	yield takeEvery(GET_BOOTHVOTERS, fetchBoothVoters);
	yield takeEvery(GET_BOOTHUSER_DETAIL, fetchBoothUserDetail);
	yield takeEvery(GET_CLASS_BOOTHVOTERS, fetchClassBoothVoters);
	yield takeEvery(GET_BOOTHVOTERS_TABLE_COLUMN_NAMES, fetchBoothVotersTableColumnNames);
	yield takeEvery(ADD_BOOTHVOTERS, onAddBoothVoters);
	yield takeEvery(UPDATE_BOOTHVOTERS, onUpdateBoothVoters);
	yield takeEvery(DELETE_BOOTHVOTERS, onDeleteBoothVoters);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS, onActivateDeactivate);
	yield takeEvery(ON_ACTIVATE_BOOTHVOTERS, onActivateBoothVoters);

}

function* BoothVotersSaga() {
	yield all([fork(watchBoothVoters)]);
}

export default BoothVotersSaga;