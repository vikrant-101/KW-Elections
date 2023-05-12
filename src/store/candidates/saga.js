import {
	takeEvery,
	fork,
	put,
	all,
	call,
	debounce,
	throttle
} from "redux-saga/effects";

// Login Redux States
import {
	GET_CANDIDATES,
	GET_CANDIDATES_TABLE_COLUMN_NAMES,
	ADD_CANDIDATES,
	UPDATE_CANDIDATES,
	DELETE_CANDIDATES,
	ON_ACTIVATE_DEACTIVATE_CANDIDATES,
} from "./actionTypes";

import {
	activateDeactivateCandidatesFail,
	activateDeactivateCandidatesSuccess,
	addCandidatesFail,
	addCandidatesSuccess,
	deleteCandidatesFail,
	deleteCandidatesSuccess,
	getCandidatesFail,
	getCandidatesSuccess,
	getCandidatesTableColumnNamesFail,
	getCandidatesTableColumnNamesSuccess,
	updateCandidatesFail,
	updateCandidatesSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateCandidates,
	addCandidates,
	deleteCandidates,
	getCandidates,
	getCandidatesTableColumnNames,
	updateCandidates
} from "../../helpers/fakebackend_helper";


// Fetch Candidates 
function* fetchCandidates() {
	try {
		const response = yield call(getCandidates);
		yield put(getCandidatesSuccess(response.Data));
	} catch (error) {
		yield put(getCandidatesFail(error));
	}
}

// Fetch Candidates Table Columns Names 
function* fetchCandidatesTableColumnNames(moduleName) {
	try {
		const response = yield call(getCandidatesTableColumnNames, moduleName);
		yield put(getCandidatesTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getCandidatesTableColumnNamesFail(error));
	}
}


// Add Candidates  
function* onAddCandidates({ payload: candidates }) {
	try {
		const response = yield call(addCandidates, candidates);
			yield put(addCandidatesSuccess(response));	
	} catch (error) {
		yield put(addCandidatesFail(error));
	}
}

// Update Candidates  
function* onUpdateCandidates({ payload:candidates }) {
	try {
		const response = yield call(updateCandidates,candidates);
		yield put(updateCandidatesSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateCandidatesFail(error));
	}
}

// Delete Candidates
function* onDeleteCandidates({ payload: candidates }) {
	try {
		const response = yield call(deleteCandidates, candidates);
		yield put(deleteCandidatesSuccess(response))
	} catch (error) {
		yield put(deleteCandidatesFail(error))
	}
}

function* onActivateDeactivate({payload: candidates}) {
	try{
		yield put(activateDeactivateCandidatesSuccess(candidates))
		yield call(activateDeactivateCandidates, candidates);
	
	} catch (error) {
		yield put(activateDeactivateCandidatesFail(error))
	}
}


export function* watchCandidates() {
	yield takeEvery(GET_CANDIDATES, fetchCandidates);
	yield takeEvery(GET_CANDIDATES_TABLE_COLUMN_NAMES, fetchCandidatesTableColumnNames);
	yield takeEvery(ADD_CANDIDATES, onAddCandidates);
	yield takeEvery(UPDATE_CANDIDATES, onUpdateCandidates);
	yield takeEvery(DELETE_CANDIDATES, onDeleteCandidates);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_CANDIDATES, onActivateDeactivate);

}

function* CandidatesSaga() {
	yield all([fork(watchCandidates)]);
}

export default CandidatesSaga;