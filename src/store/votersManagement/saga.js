import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_VOTERSMANAGEMENT,
	GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES,
	ADD_VOTERSMANAGEMENT,
	UPDATE_VOTERSMANAGEMENT,
	DELETE_VOTERSMANAGEMENT,
	GET_SCREENS,
	GET_DEVICES,
	ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT,
	GET_TRANSLATION,
} from "./actionTypes";

import {
	activateDeactivateVotersManagementFail,
	activateDeactivateVotersManagementSuccess,
	addVotersManagementFail,
	addVotersManagementSuccess,
	deleteVotersManagementFail,
	deleteVotersManagementSuccess,
	getDevicesFail,
	getDevicesSuccess,
	getVotersManagementFail,
	getVotersManagementSuccess,
	getVotersManagementTableColumnNamesFail,
	getVotersManagementTableColumnNamesSuccess,
	getScreensFail,
	getScreensSuccess,
	getTranslationFail,
	getTranslationSuccess,
	updateVotersManagementFail,
	updateVotersManagementSuccess
} from "./actions";

import {
	activateDeactivate,
	activateDeactivateVotersManagement,
	addVotersManagement,
	deleteVotersManagement,
	getDevices,
	getVotersManagement,
	getVotersManagementTableColumnNames,
	getScreens,
	getTranslation,
	updateVotersManagement
} from "../../helpers/fakebackend_helper";


// Fetch VotersManagement 
function* fetchVotersManagement() {
	try {
		const response = yield call(getVotersManagement);
		yield put(getVotersManagementSuccess(response.Data));
	} catch (error) {
		yield put(getVotersManagementFail(error));
	}
}

// Fetch VotersManagement Table Columns Names 
function* fetchVotersManagementTableColumnNames(moduleName) {
	try {
		const response = yield call(getVotersManagementTableColumnNames, moduleName);
		yield put(getVotersManagementTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getVotersManagementTableColumnNamesFail(error));
	}
}


// Add VotersManagement  
function* onAddVotersManagement({ payload: votersmanagement }) {
	try {
		const response = yield call(addVotersManagement, votersmanagement);
			yield put(addVotersManagementSuccess(response));	
	} catch (error) {
		yield put(addVotersManagementFail(error));
	}
}

// Update VotersManagement  
function* onUpdateVotersManagement({ payload:votersmanagement }) {
	try {
		const response = yield call(updateVotersManagement,votersmanagement);
		yield put(updateVotersManagementSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateVotersManagementFail(error));
	}
}

// Delete VotersManagement
function* onDeleteVotersManagement({ payload: votersmanagement }) {
	try {
		const response = yield call(deleteVotersManagement, votersmanagement);
		yield put(deleteVotersManagementSuccess(response))
	} catch (error) {
		yield put(deleteVotersManagementFail(error))
	}
}

function* onActivateDeactivate({payload: votersmanagement}) {
	try{
		yield put(activateDeactivateVotersManagementSuccess(votersmanagement))
		yield call(activateDeactivateVotersManagement, votersmanagement);
	} catch (error) {
		yield put(activateDeactivateVotersManagementFail(error))
	}
}


export function* watchVotersManagement() {
	yield takeEvery(GET_VOTERSMANAGEMENT, fetchVotersManagement);
	yield takeEvery(GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES, fetchVotersManagementTableColumnNames);
	yield takeEvery(ADD_VOTERSMANAGEMENT, onAddVotersManagement);
	yield takeEvery(UPDATE_VOTERSMANAGEMENT, onUpdateVotersManagement);
	yield takeEvery(DELETE_VOTERSMANAGEMENT, onDeleteVotersManagement);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT, onActivateDeactivate);

}

function* VotersManagementSaga() {
	yield all([fork(watchVotersManagement)]);
}

export default VotersManagementSaga;