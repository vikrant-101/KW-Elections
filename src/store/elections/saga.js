import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_ELECTIONS,
	GET_ELECTIONS_TABLE_COLUMN_NAMES,
	ADD_ELECTIONS,
	UPDATE_ELECTIONS,
	DELETE_ELECTIONS,
	GET_SCREENS,
	GET_DEVICES,
	ON_ACTIVATE_DEACTIVATE_ELECTIONS,
	GET_TRANSLATION,
} from "./actionTypes";

import {
	activateDeactivateElectionsFail,
	activateDeactivateElectionsSuccess,
	addElectionsFail,
	addElectionsSuccess,
	deleteElectionsFail,
	deleteElectionsSuccess,
	getDevicesFail,
	getDevicesSuccess,
	getElectionsFail,
	getElectionsSuccess,
	getElectionsTableColumnNamesFail,
	getElectionsTableColumnNamesSuccess,
	getScreensFail,
	getScreensSuccess,
	getTranslationFail,
	getTranslationSuccess,
	updateElectionsFail,
	updateElectionsSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateElections,
	addElections,
	deleteElections,
	getDevices,
	getElections,
	getElectionsTableColumnNames,
	getScreens,
	getTranslation,
	updateElections
} from "../../helpers/fakebackend_helper";


// Fetch Elections 
function* fetchElections() {
	try {
		const response = yield call(getElections);
		yield put(getElectionsSuccess(response.Data));
	} catch (error) {
		yield put(getElectionsFail(error));
	}
}

// Fetch Elections Table Columns Names 
function* fetchElectionsTableColumnNames(moduleName) {
	try {
		const response = yield call(getElectionsTableColumnNames, moduleName);
		yield put(getElectionsTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getElectionsTableColumnNamesFail(error));
	}
}


// Add Elections  
function* onAddElections({ payload: elections }) {
	try {
		const response = yield call(addElections, elections);
			yield put(addElectionsSuccess(response));	
	} catch (error) {
		yield put(addElectionsFail(error));
	}
}

// Update Elections  
function* onUpdateElections({ payload:elections }) {
	try {
		const response = yield call(updateElections,elections);
		yield put(updateElectionsSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateElectionsFail(error));
	}
}

// Delete Elections
function* onDeleteElections({ payload: elections }) {
	try {
		const response = yield call(deleteElections, elections);
		yield put(deleteElectionsSuccess(response))
	} catch (error) {
		yield put(deleteElectionsFail(error))
	}
}

function* onActivateDeactivate({payload: elections}) {
	try{
		yield put(activateDeactivateElectionsSuccess(elections))
		yield call(activateDeactivateElections, elections);
	} catch (error) {
		yield put(activateDeactivateElectionsFail(error))
	}
}


export function* watchElections() {
	yield takeEvery(GET_ELECTIONS, fetchElections);
	yield takeEvery(GET_ELECTIONS_TABLE_COLUMN_NAMES, fetchElectionsTableColumnNames);
	yield takeEvery(ADD_ELECTIONS, onAddElections);
	yield takeEvery(UPDATE_ELECTIONS, onUpdateElections);
	yield takeEvery(DELETE_ELECTIONS, onDeleteElections);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_ELECTIONS, onActivateDeactivate);

}

function* ElectionsSaga() {
	yield all([fork(watchElections)]);
}

export default ElectionsSaga;