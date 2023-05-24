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
	GET_ELECTION_CIRCLE,
	GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES,
	ADD_UPLOAD_VOTERS,
	ADD_ELECTION_CIRCLE,
	UPDATE_UPLOAD_VOTERS,
	DELETE_UPLOAD_VOTERS,
	ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS,
} from "./actionTypes";

import {
	activateDeactivateUploadVotersFail,
	activateDeactivateUploadVotersSuccess,
	addUploadVotersFail,
	addUploadVotersSuccess,
	deleteUploadVotersFail,
	deleteUploadVotersSuccess,
	getElectionCircleSuccess,
	getElectionCircleFail,
	getUploadVotersTableColumnNamesFail,
	getUploadVotersTableColumnNamesSuccess,
	updateUploadVotersFail,
	updateUploadVotersSuccess,
	addElectionCircleSuccess,
	addElectionCircleFail,
} from "./actions";

import {
	activateDeactivate,
	addElectionCircle,
	activateDeactivateUploadVoters,
	addUploadVoters,
	deleteUploadVoters,
	getElectionCircle,
	getUploadVotersTableColumnNames,
	updateUploadVoters,
	UploadVoters
} from "../../helpers/fakebackend_helper";


// Fetch Upload Voters 
function* fetchElectionCircle() {
	try {
		const response = yield call(getElectionCircle);
		yield put(getElectionCircleSuccess(response.Data));
	} catch (error) {
		yield put(getElectionCircleFail(error));
	}
}

// Fetch Upload Voters Table Columns Names 
function* fetchUploadVotersTableColumnNames(moduleName) {
	try {
		const response = yield call(getUploadVotersTableColumnNames, moduleName);
		yield put(getUploadVotersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getUploadVotersTableColumnNamesFail(error));
	}
}


// Add Upload Voters  
function* onAddUploadVoters({ payload: uploadVoters }) {
	try {
		const response = yield call(addUploadVoters, uploadVoters.formData);
		if(response.Url) {
			const obj = {
				ObjectID:uploadVoters.ObjectID,
				FileURL: response.Url
			}
			const response1 = yield call(UploadVoters, obj);
			yield put(addUploadVotersSuccess(response1));
		}
	} catch (error) {
		yield put(addUploadVotersFail(error));
	}
}

// Add Add Election Circle
function* onAddElectionCircle({ payload: electionCircle }) {
	try {
		const response = yield call(addElectionCircle, electionCircle);
		yield put(addElectionCircleSuccess(response));
	} catch (error) {
		yield put(addElectionCircleFail(error));
	}
}

// Update Upload Voters  
function* onUpdateUploadVoters({ payload: uploadVoters }) {
	try {
		const response = yield call(updateUploadVoters, uploadVoters);
		yield put(updateUploadVotersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateUploadVotersFail(error));
	}
}

// Delete Upload Voters
function* onDeleteUploadVoters({ payload: uploadVoters }) {
	try {
		const response = yield call(deleteUploadVoters, uploadVoters);
		yield put(deleteUploadVotersSuccess(response))
	} catch (error) {
		yield put(deleteUploadVotersFail(error))
	}
}

function* onActivateDeactivate({ payload: uploadVoters }) {
	try {
		yield put(activateDeactivateUploadVotersSuccess(uploadVoters))
		yield call(activateDeactivateUploadVoters, uploadVoters);

	} catch (error) {
		yield put(activateDeactivateUploadVotersFail(error))
	}
}


export function* watchUploadVoters() {
	yield takeEvery(GET_ELECTION_CIRCLE, fetchElectionCircle);
	yield takeEvery(GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES, fetchUploadVotersTableColumnNames);
	yield takeEvery(ADD_UPLOAD_VOTERS, onAddUploadVoters);
	yield takeEvery(ADD_ELECTION_CIRCLE, onAddElectionCircle);
	yield takeEvery(UPDATE_UPLOAD_VOTERS, onUpdateUploadVoters);
	yield takeEvery(DELETE_UPLOAD_VOTERS, onDeleteUploadVoters);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS, onActivateDeactivate);

}

function* UploadVotersSaga() {
	yield all([fork(watchUploadVoters)]);
}

export default UploadVotersSaga;