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
	GET_CLASSES,
	GET_CLASSES_TABLE_COLUMN_NAMES,
	ADD_CLASSES,
	UPDATE_CLASSES,
	DELETE_CLASSES,
	ON_ACTIVATE_DEACTIVATE_CLASSES,
} from "./actionTypes";

import {
	activateDeactivateClassesFail,
	activateDeactivateClassesSuccess,
	addClassesFail,
	addClassesSuccess,
	deleteClassesFail,
	deleteClassesSuccess,
	getClassesFail,
	getClassesSuccess,
	getClassesTableColumnNamesFail,
	getClassesTableColumnNamesSuccess,
	updateClassesFail,
	updateClassesSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateClasses,
	addClasses,
	deleteClasses,
	getClasses,
	getClassesTableColumnNames,
	updateClasses
} from "../../helpers/fakebackend_helper";


// Fetch Classes 
function* fetchClasses(userID) {
	try {
		const response = yield call(getClasses, userID);
		yield put(getClassesSuccess(response.Data));
	} catch (error) {
		yield put(getClassesFail(error));
	}
}

// Fetch Classes Table Columns Names 
function* fetchClassesTableColumnNames(moduleName) {
	try {
		const response = yield call(getClassesTableColumnNames, moduleName);
		yield put(getClassesTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getClassesTableColumnNamesFail(error));
	}
}


// Add Classes  
function* onAddClasses({ payload: classes }) {
	try {
		const response = yield call(addClasses, classes);
		yield put(addClassesSuccess(response));
	} catch (error) {
		yield put(addClassesFail(error));
	}
}

// Update Classes  
function* onUpdateClasses({ payload: classes }) {
	try {
		const response = yield call(updateClasses, classes);
		yield put(updateClassesSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateClassesFail(error));
	}
}

// Delete Classes
function* onDeleteClasses({ payload: classes }) {
	try {
		const response = yield call(deleteClasses, classes);
		yield put(deleteClassesSuccess(response))
	} catch (error) {
		yield put(deleteClassesFail(error))
	}
}

function* onActivateDeactivate({ payload: classes }) {
	try {
		yield put(activateDeactivateClassesSuccess(classes))
		yield call(activateDeactivateClasses, classes);

	} catch (error) {
		yield put(activateDeactivateClassesFail(error))
	}
}


export function* watchClasses() {
	yield takeEvery(GET_CLASSES, fetchClasses);
	yield takeEvery(GET_CLASSES_TABLE_COLUMN_NAMES, fetchClassesTableColumnNames);
	yield takeEvery(ADD_CLASSES, onAddClasses);
	yield takeEvery(UPDATE_CLASSES, onUpdateClasses);
	yield takeEvery(DELETE_CLASSES, onDeleteClasses);
	yield throttle(2000, ON_ACTIVATE_DEACTIVATE_CLASSES, onActivateDeactivate);

}

function* ClassesSaga() {
	yield all([fork(watchClasses)]);
}

export default ClassesSaga;