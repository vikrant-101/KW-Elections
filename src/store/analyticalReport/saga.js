import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
    GET_AREAWISE_REPORT,
    GET_SCHOOLWISE_REPORT,
    GET_BOOTHWISE_REPORT,
    GET_FAMILYNAMEWISE_REPORT,
	GET_AREAWISE_TABLE_COLUMN_NAMES,
	GET_SCHOOLWISE_TABLE_COLUMN_NAMES,
	GET_BOOTHWISE_TABLE_COLUMN_NAMES,
	GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES
} from "./actionTypes";

import {
    getAreaWiseFail,
    getAreaWiseSuccess,
	getAreaWiseTableColumnNamesFail,
	getAreaWiseTableColumnNamesSuccess,
    getSchoolWiseFail,
    getSchoolWiseSuccess,
	getSchoolWiseTableColumnNamesFail,
	getSchoolWiseTableColumnNamesSuccess,
    getBoothWiseFail,
    getBoothWiseSuccess,
	getBoothWiseTableColumnNamesFail,
	getBoothWiseTableColumnNamesSuccess,
    getFamilyNameWiseFail,
    getFamilyNameWiseSuccess,
	getFamilyNameWiseTableColumnNamesFail,
	getFamilyNameWiseTableColumnNamesSuccess
} from "./actions";

import {
	getAreaWiseReport,
    getSchoolWiseReport,
    getBoothWiseReport,
    getFamilyNameWiseReport,
	getAreaWiseTableColumnNames,
	getSchoolWiseTableColumnNames,
    getBoothWiseTableColumnNames,
	getFamilyNameWiseTableColumnNames
} from "../../helpers/fakebackend_helper";


// Fetch Area Wise Report 
function* fetchAreaWiseReport({userID}) {
	try {
		const response = yield call(getAreaWiseReport, userID);
		yield put(getAreaWiseSuccess(response.Data));
	} catch (error) {
		yield put(getAreaWiseFail(error));
	}
}

// Fetch Area Table Columns Names 
function* fetchAreaWiseTableColumnNames(moduleName) {
	try {
		const response = yield call(getAreaWiseTableColumnNames, moduleName);
		yield put(getAreaWiseTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getAreaWiseTableColumnNamesFail(error));
	}
}

// Fetch School Wise Report
function* fetchSchoolWiseReport({userID}) {
	try {
		const response = yield call(getSchoolWiseReport, userID);
		yield put(getSchoolWiseSuccess(response.Data));
	} catch (error) {
		yield put(getSchoolWiseFail(error));
	}
}

// Fetch School Table Columns Names 
function* fetchSchoolWiseTableColumnNames(moduleName) {
	try {
		const response = yield call(getSchoolWiseTableColumnNames, moduleName);
		yield put(getSchoolWiseTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getSchoolWiseTableColumnNamesFail(error));
	}
}


// Fetch Booth Wise Report  
function* fetchBoothWiseReport({userID}) {
	console.log('userID: Booth ', userID);
	try {
		const response = yield call(getBoothWiseReport, userID);
		yield put(getBoothWiseSuccess(response.Data));
	} catch (error) {
		yield put(getBoothWiseFail(error));
	}
}

// Fetch Booth Table Columns Names 
function* fetchBoothWiseTableColumnNames(moduleName) {
	try {
		const response = yield call(getBoothWiseTableColumnNames, moduleName);
		yield put(getBoothWiseTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getBoothWiseTableColumnNamesFail(error));
	}
}

// Fetch Family Name Wise Report
function* fetchFamilyNameReport({userID}) {
	try {
		const response = yield call(getFamilyNameWiseReport, userID);
		yield put(getFamilyNameWiseSuccess(response.Data));
	} catch (error) {
		yield put(getFamilyNameWiseFail(error));
	}
}

// Fetch Booth Table Columns Names 
function* fetchFamilyNameWiseTableColumnNames(moduleName) {
	try {
		const response = yield call(getFamilyNameWiseTableColumnNames, moduleName);
		yield put(getFamilyNameWiseTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getFamilyNameWiseTableColumnNamesFail(error));
	}
}



export function* watchElections() {
	yield takeEvery(GET_AREAWISE_REPORT, fetchAreaWiseReport);
	yield takeEvery(GET_AREAWISE_TABLE_COLUMN_NAMES, fetchAreaWiseTableColumnNames);

	yield takeEvery(GET_SCHOOLWISE_REPORT, fetchSchoolWiseReport);
	yield takeEvery(GET_SCHOOLWISE_TABLE_COLUMN_NAMES, fetchSchoolWiseTableColumnNames);

	yield takeEvery(GET_BOOTHWISE_REPORT, fetchBoothWiseReport);
	yield takeEvery(GET_BOOTHWISE_TABLE_COLUMN_NAMES, fetchBoothWiseTableColumnNames);

	yield takeEvery(GET_FAMILYNAMEWISE_REPORT, fetchFamilyNameReport);
	yield takeEvery(GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES, fetchFamilyNameWiseTableColumnNames);

	
}

function* ElectionsSaga() {
	yield all([fork(watchElections)]);
}

export default ElectionsSaga;