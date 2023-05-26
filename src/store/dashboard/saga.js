import {
	takeEvery,
	fork,
	put,
	all,
	call,
} from "redux-saga/effects";

// Login Redux States
import {
	GET_TOTAL_COUNT,
} from "./actionTypes";

import {
	getTotalCountFail,
	getTotalCountSuccess,
} from "./actions";

import {
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

export function* watchDashboard() {
	yield takeEvery(GET_TOTAL_COUNT, fetchTotalCount);

}

function* DashboardSaga() {
	yield all([fork(watchDashboard)]);
}

export default DashboardSaga;