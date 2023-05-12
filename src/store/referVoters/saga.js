import {
	takeEvery,
	fork,
	put,
	all,
	call,
	throttle
} from "redux-saga/effects";

// Login Redux States
import {
	GET_REFER_VOTERS,
	GET_REFER_VOTERS_TABLE_COLUMN_NAMES,
	ADD_REFER_VOTERS,
	UPDATE_REFER_VOTERS,
	DELETE_REFER_VOTERS,
	ON_ACTIVATE_DEACTIVATE_REFER_VOTERS,
} from "./actionTypes";

import {
	activateDeactivateReferVotersFail,
	activateDeactivateReferVotersSuccess,
	addCirclesFail,
	addCirclesSuccess,
	addReferVotersFail,
	addReferVotersSuccess,
	deleteCirclesFail,
	deleteCirclesSuccess,
	deleteReferVoters,
	deleteReferVotersFail,
	deleteReferVotersSuccess,
	getCirclesFail,
	getCirclesSuccess,
	getCirclesTableColumnNamesFail,
	getCirclesTableColumnNamesSuccess,
	getReferVotersFail,
	getReferVotersSuccess,
	getReferVotersTableColumnNamesFail,
	getReferVotersTableColumnNamesSuccess,
	updateCirclesFail,
	updateCirclesSuccess,
	updateReferVoters,
	updateReferVotersFail,
	updateReferVotersSuccess
} from "./actions";

import {
	activateDeactivate,
	getReferVoters,
	getReferVotersTableColumnNames,
	activateDeactivateReferVoters,
	addReferVoters,
	deleteCircles,
	getCircles,
	getCirclesTableColumnNames,
	updateCircles
} from "../../helpers/fakebackend_helper";


// Fetch Circles 
function* fetchReferVoters() {
	try {
		const response = yield call(getReferVoters);
		console.log('response: ', response);
		yield put(getReferVotersSuccess(response.Data));
	} catch (error) {
		yield put(getReferVotersFail(error));
	}
}

// Fetch Circles Table Columns Names 
function* fetchReferVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getReferVotersTableColumnNames, moduleName);
		yield put(getReferVotersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getReferVotersTableColumnNamesFail(error));
	}
}


// Add Circles  
function* onAddReferVoters({ payload: referVoters }) {
	console.log('referVotersDetails: ', referVoters);
	try {
		const response = yield call(addReferVoters, referVoters);
		yield put(addReferVotersSuccess(response));
	} catch (error) {
		yield put(addReferVotersFail(error));
	}
}

// Update Circles  
function* onUpdateReferVoters({ payload: referVoters }) {
	try {
		const response = yield call(updateReferVoters, referVoters);
		yield put(updateReferVotersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateReferVotersFail(error));
	}
}

// Delete ReferVoters
function* onDeleteReferVoters({ payload: referVoters }) {
	try {
		const response = yield call(deleteReferVoters, referVoters);
		yield put(deleteReferVotersSuccess(response))
	} catch (error) {
		yield put(deleteReferVotersFail(error))
	}
}

function* onActivateDeactivate({ payload: referVoters }) {
	try {
		yield put(activateDeactivateReferVotersSuccess(referVoters))
		yield call(activateDeactivateReferVoters, referVoters);

	} catch (error) {
		yield put(activateDeactivateReferVotersFail(error))
	}
}


export function* watchReferVoters() {
	yield takeEvery(GET_REFER_VOTERS, fetchReferVoters);
	yield takeEvery(GET_REFER_VOTERS_TABLE_COLUMN_NAMES, fetchReferVotersTableColumnNames);
	yield takeEvery(ADD_REFER_VOTERS, onAddReferVoters);
	yield takeEvery(UPDATE_REFER_VOTERS, onUpdateReferVoters);
	yield takeEvery(DELETE_REFER_VOTERS, onDeleteReferVoters);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_REFER_VOTERS, onActivateDeactivate);

}

function* ReferVotersSaga() {
	yield all([fork(watchReferVoters)]);
}

export default ReferVotersSaga;