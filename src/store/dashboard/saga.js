import {
	takeEvery,
	fork,
	put,
	all,
	call,
} from "redux-saga/effects";

// Login Redux States
import {
	GET_COUNT,
	GET_TOTAL_COUNT,
} from "./actionTypes";

import {
	getCountFail,
	getCountSuccess,
	getTotalCountFail,
	getTotalCountSuccess,
} from "./actions";

import {
	getCount,
	getTotalCount,

} from "../../helpers/fakebackend_helper";


function* fetchTotalCount({ payload: votersCount }) {
	try {
		const response = yield call(getTotalCount, votersCount);
		yield put(getTotalCountSuccess(response));
	} catch (error) {
		yield put(getTotalCountFail(error));
	}
}

function* fetchCount({ payload: count }) {
	try {
		const response = yield call(getCount, count);
		yield put(getCountSuccess(response));
	} catch (error) {
		yield put(getCountFail(error));
	}
}

export function* watchDashboard() {
	yield takeEvery(GET_TOTAL_COUNT, fetchTotalCount);
	yield takeEvery(GET_COUNT, fetchCount )

}

function* DashboardSaga() {
	yield all([fork(watchDashboard)]);
}

export default DashboardSaga;