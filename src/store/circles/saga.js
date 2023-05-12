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
	GET_CIRCLES,
	GET_CIRCLES_TABLE_COLUMN_NAMES,
	ADD_CIRCLES,
	UPDATE_CIRCLES,
	DELETE_CIRCLES,
	ON_ACTIVATE_DEACTIVATE_CIRCLES,
} from "./actionTypes";

import {
	activateDeactivateCirclesFail,
	activateDeactivateCirclesSuccess,
	addCirclesFail,
	addCirclesSuccess,
	deleteCirclesFail,
	deleteCirclesSuccess,
	getCirclesFail,
	getCirclesSuccess,
	getCirclesTableColumnNamesFail,
	getCirclesTableColumnNamesSuccess,
	updateCirclesFail,
	updateCirclesSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateCircles,
	addCircles,
	deleteCircles,
	getCircles,
	getCirclesTableColumnNames,
	updateCircles
} from "../../helpers/fakebackend_helper";


// Fetch Circles 
function* fetchCircles() {
	try {
		const response = yield call(getCircles);
		yield put(getCirclesSuccess(response.Data));
	} catch (error) {
		yield put(getCirclesFail(error));
	}
}

// Fetch Circles Table Columns Names 
function* fetchCirclesTableColumnNames(moduleName) {
	try {
		const response = yield call(getCirclesTableColumnNames, moduleName);
		yield put(getCirclesTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getCirclesTableColumnNamesFail(error));
	}
}


// Add Circles  
function* onAddCircles({ payload: circles }) {
	try {
		const response = yield call(addCircles, circles);
		yield put(addCirclesSuccess(response));
	} catch (error) {
		yield put(addCirclesFail(error));
	}
}

// Update Circles  
function* onUpdateCircles({ payload: circles }) {
	try {
		const response = yield call(updateCircles, circles);
		yield put(updateCirclesSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateCirclesFail(error));
	}
}

// Delete Circles
function* onDeleteCircles({ payload: circles }) {
	try {
		const response = yield call(deleteCircles, circles);
		yield put(deleteCirclesSuccess(response))
	} catch (error) {
		yield put(deleteCirclesFail(error))
	}
}

function* onActivateDeactivate({ payload: circles }) {
	try {
		yield put(activateDeactivateCirclesSuccess(circles))
		yield call(activateDeactivateCircles, circles);

	} catch (error) {
		yield put(activateDeactivateCirclesFail(error))
	}
}


export function* watchCircles() {
	yield takeEvery(GET_CIRCLES, fetchCircles);
	yield takeEvery(GET_CIRCLES_TABLE_COLUMN_NAMES, fetchCirclesTableColumnNames);
	yield takeEvery(ADD_CIRCLES, onAddCircles);
	yield takeEvery(UPDATE_CIRCLES, onUpdateCircles);
	yield takeEvery(DELETE_CIRCLES, onDeleteCircles);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_CIRCLES, onActivateDeactivate);

}

function* CirclesSaga() {
	yield all([fork(watchCircles)]);
}

export default CirclesSaga;