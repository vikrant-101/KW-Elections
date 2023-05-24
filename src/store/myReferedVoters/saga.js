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
	GET_MY_REFERED_VOTERS,
	GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES,
	ADD_MY_REFERED_VOTERS,
	UPDATE_MY_REFERED_VOTERS,
	DELETE_MY_REFERED_VOTERS,
	ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS,
} from "./actionTypes";

import {
	activateDeactivateMyReferedVotersFail,
	activateDeactivateMyReferedVotersSuccess,
	addMyReferedVotersFail,
	addMyReferedVotersSuccess,
	deleteMyReferedVotersFail,
	deleteMyReferedVotersSuccess,
	getMyReferedVotersFail,
	getMyReferedVotersSuccess,
	getMyReferedVotersTableColumnNamesFail,
	getMyReferedVotersTableColumnNamesSuccess,
	updateMyReferedVotersFail,
	updateMyReferedVotersSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateMyReferedVoters,
	addMyReferedVoters,
	deleteMyReferedVoters,
	getMyReferedVoters,
	getMyReferedVotersTableColumnNames,
	updateMyReferedVoters
} from "../../helpers/fakebackend_helper";


// Fetch MyReferedVoters 
function* fetchMyReferedVoters({payload: myReferedVoters}) {
	try {
		const response = yield call(getMyReferedVoters, myReferedVoters);
		yield put(getMyReferedVotersSuccess(response.Data));
	} catch (error) {
		yield put(getMyReferedVotersFail(error));
	}
}

// Fetch MyReferedVoters Table Columns Names 
function* fetchMyReferedVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getMyReferedVotersTableColumnNames, moduleName);
		yield put(getMyReferedVotersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getMyReferedVotersTableColumnNamesFail(error));
	}
}


// Add MyReferedVoters  
function* onAddMyReferedVoters({ payload: myReferedVoters }) {
	try {
		const response = yield call(addMyReferedVoters, myReferedVoters);
		yield put(addMyReferedVotersSuccess(response));
	} catch (error) {
		yield put(addMyReferedVotersFail(error));
	}
}

// Update MyReferedVoters  
function* onUpdateMyReferedVoters({ payload: myReferedVoters }) {
	try {
		const response = yield call(updateMyReferedVoters, myReferedVoters);
		yield put(updateMyReferedVotersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateMyReferedVotersFail(error));
	}
}

// Delete MyReferedVoters
function* onDeleteMyReferedVoters({ payload: myReferedVoters }) {
	try {
		const response = yield call(deleteMyReferedVoters, myReferedVoters);
		yield put(deleteMyReferedVotersSuccess(response))
	} catch (error) {
		yield put(deleteMyReferedVotersFail(error))
	}
}

function* onActivateDeactivate({ payload: myReferedVoters }) {
	try {
		yield put(activateDeactivateMyReferedVotersSuccess(myReferedVoters))
		yield call(activateDeactivateMyReferedVoters, myReferedVoters);

	} catch (error) {
		yield put(activateDeactivateMyReferedVotersFail(error))
	}
}


export function* watchMyReferedVoters() {
	yield takeEvery(GET_MY_REFERED_VOTERS, fetchMyReferedVoters);
	yield takeEvery(GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES, fetchMyReferedVotersTableColumnNames);
	yield takeEvery(ADD_MY_REFERED_VOTERS, onAddMyReferedVoters);
	yield takeEvery(UPDATE_MY_REFERED_VOTERS, onUpdateMyReferedVoters);
	yield takeEvery(DELETE_MY_REFERED_VOTERS, onDeleteMyReferedVoters);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS, onActivateDeactivate);

}

function* MyReferedVotersSaga() {
	yield all([fork(watchMyReferedVoters)]);
}

export default MyReferedVotersSaga;