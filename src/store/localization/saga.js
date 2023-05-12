import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_LOCALIZATION,
	GET_LOCALIZATION_TABLE_COLUMN_NAMES,
	ADD_LOCALIZATION,
	UPDATE_LOCALIZATION,
	DELETE_LOCALIZATION,
	GET_SCREENS,
	GET_DEVICES,
	ON_ACTIVATE_DEACTIVATE_LOCALIZATION,
	GET_TRANSLATION,
} from "./actionTypes";

import {
	activateDeactivateLocalizationFail,
	activateDeactivateLocalizationSuccess,
	addLocalizationFail,
	addLocalizationSuccess,
	deleteLocalizationFail,
	deleteLocalizationSuccess,
	getDevicesFail,
	getDevicesSuccess,
	getLocalizationFail,
	getLocalizationSuccess,
	getLocalizationTableColumnNamesFail,
	getLocalizationTableColumnNamesSuccess,
	getScreensFail,
	getScreensSuccess,
	getTranslationFail,
	getTranslationSuccess,
	updateLocalizationFail,
	updateLocalizationSuccess
} from "./actions";

import {
	activateDeactivate,
	addLocalization,
	deleteLocalization,
	getDevices,
	getLocalization,
	getLocalizationTableColumnNames,
	getScreens,
	getTranslation,
	updateLocalization
} from "../../helpers/fakebackend_helper";


// Fetch Localization 
function* fetchLocalization() {
	try {
		const response = yield call(getLocalization);
		yield put(getLocalizationSuccess(response.Data));
	} catch (error) {
		yield put(getLocalizationFail(error));
	}
}

// Fetch Screens
function* fetchScreens() {
	try {
		const response = yield call(getScreens);
		yield put(getScreensSuccess(response.Data));
	} catch (error) {
		yield put(getScreensFail(error));
	}
}

// Fetch Devices
function* fetchDevices() {
	try {
		const response = yield call(getDevices);
		yield put(getDevicesSuccess(response.Data));
	} catch (error) {
		yield put(getDevicesFail(error));
	}
}

// Fetch Localization Table Columns Names 
function* fetchLocalizationTableColumnNames(moduleName) {
	try {
		const response = yield call(getLocalizationTableColumnNames, moduleName);
		yield put(getLocalizationTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getLocalizationTableColumnNamesFail(error));
	}
}


// Add Localization  
function* onAddLocalization({ payload: localization }) {
	try {
		const response = yield call(addLocalization, localization);
			yield put(addLocalizationSuccess(response));	
	} catch (error) {
		yield put(addLocalizationFail(error));
	}
}

// Update Localization  
function* onUpdateLocalization({ payload:localization }) {
	try {
		const response = yield call(updateLocalization,localization);
		yield put(updateLocalizationSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateLocalizationFail(error));
	}
}

// Delete Localization
function* onDeleteLocalization({ payload: localization }) {
	try {
		const response = yield call(deleteLocalization, localization);
		yield put(deleteLocalizationSuccess(response))
	} catch (error) {
		yield put(deleteLocalizationFail(error))
	}
}

// function* onActivateDeactivate({payload: localization}) {
// 	try{
// 		const response = yield call(activateDeactivate, localization);
// 		yield put(activateDeactivateLocalizationSuccess(response))
// 	} catch (error) {
// 		yield put(activateDeactivateLocalizationFail(error))
// 	}
// }

// function* onTranslate({payload: translation}) {
// 	try{
// 		const response = yield call(getTranslation, translation);
// 		yield put(getTranslationSuccess(response))
// 	} catch (error) {
// 		yield put(getTranslationFail(error))
// 	}
// }

export function* watchLocalization() {
	yield takeEvery(GET_LOCALIZATION, fetchLocalization);
	yield takeEvery(GET_LOCALIZATION_TABLE_COLUMN_NAMES, fetchLocalizationTableColumnNames);
	yield takeEvery(ADD_LOCALIZATION, onAddLocalization);
	yield takeEvery(UPDATE_LOCALIZATION, onUpdateLocalization);
	yield takeEvery(DELETE_LOCALIZATION, onDeleteLocalization);
	yield takeEvery(GET_SCREENS, fetchScreens);
	yield takeEvery( GET_DEVICES, fetchDevices);
	// yield takeEvery(ON_ACTIVATE_DEACTIVATE_LOCALIZATION, onActivateDeactivate);
	// yield takeEvery(GET_TRANSLATION, onTranslate)

}

function* LocalizationSaga() {
	yield all([fork(watchLocalization)]);
}

export default LocalizationSaga;