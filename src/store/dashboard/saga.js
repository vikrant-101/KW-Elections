import {
	takeEvery,
	fork,
	put,
	all,
	call,
} from "redux-saga/effects";

// Login Redux States
import {
	GET_AGE_COUNT,
	GET_COUNT,
	GET_TOTAL_COUNT,
	GET_VOTERS_STATISTICS,
} from "./actionTypes";

import {
	getAgeCountFail,
	getAgeCountSuccess,
	getCountFail,
	getCountSuccess,
	getTotalCountFail,
	getTotalCountSuccess,
	getVotersStatisticsFail,
	getVotersStatisticsSuccess,
} from "./actions";

import {
	getAgeCount,
	getCount,
	getTotalCount,
	getVotersStatistics,

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

function* fetchAgeCount({ payload: ageCount }) {
	try {
		const response = yield call(getAgeCount, ageCount);
		yield put(getAgeCountSuccess(response.Data));
	} catch (error) {
		yield put(getAgeCountFail(error));
	}
}

function* fetchVotersStatistics({ payload: votersStats }) {
	try {
		const response = yield call(getVotersStatistics, votersStats);
		yield put(getVotersStatisticsSuccess(response.Data));
	} catch (error) {
		yield put(getVotersStatisticsFail(error));
	}
}


export function* watchDashboard() {
	yield takeEvery(GET_TOTAL_COUNT, fetchTotalCount);
	yield takeEvery(GET_COUNT, fetchCount);
	yield takeEvery(GET_AGE_COUNT, fetchAgeCount);
	yield takeEvery(GET_VOTERS_STATISTICS, fetchVotersStatistics);

}

function* DashboardSaga() {
	yield all([fork(watchDashboard)]);
}

export default DashboardSaga;