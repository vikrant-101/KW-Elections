import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_ALLREFERVOTERSLIST,
	GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES,
} from "./actionTypes";

import {
	getAllReferVotersListFail,
	getAllReferVotersListSuccess,
	getAllReferVotersListTableColumnNamesFail,
	getAllReferVotersListTableColumnNamesSuccess,

} from "./actions";

import {
	getAllReferVotersList,
	getAllReferVotersListTableColumnNames,
} from "../../helpers/fakebackend_helper";


// Fetch AllReferVotersList 
function* fetchAllReferVotersList({userID}) {
	try {
		const response = yield call(getAllReferVotersList, userID);
		yield put(getAllReferVotersListSuccess(response.Data));
	} catch (error) {
		yield put(getAllReferVotersListFail(error));
	}
}

// Fetch AllReferVotersList Table Columns Names 
function* fetchAllReferVotersListTableColumnNames(moduleName) {
	try {
		const response = yield call(getAllReferVotersListTableColumnNames, moduleName);
		yield put(getAllReferVotersListTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getAllReferVotersListTableColumnNamesFail(error));
	}
}


export function* watchAllReferVotersList() {
	yield takeEvery(GET_ALLREFERVOTERSLIST, fetchAllReferVotersList);
	yield takeEvery(GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES, fetchAllReferVotersListTableColumnNames);
}

function* AllReferVotersListSaga() {
	yield all([fork(watchAllReferVotersList)]);
}

export default AllReferVotersListSaga;