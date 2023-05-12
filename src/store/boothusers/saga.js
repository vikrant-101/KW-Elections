import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_BOOTHUSERS,
	GET_BOOTHUSERS_TABLE_COLUMN_NAMES,
	ADD_BOOTHUSERS,
	UPDATE_BOOTHUSERS,
	DELETE_BOOTHUSERS,
	ON_ACTIVATE_DEACTIVATE_BOOTHUSERS,
} from "./actionTypes";

import {
	activateDeactivateBoothUsersFail,
	activateDeactivateBoothUsersSuccess,
	addBoothUsersFail,
	addBoothUsersSuccess,
	deleteBoothUsersFail,
	deleteBoothUsersSuccess,
	getBoothUsersFail,
	getBoothUsersSuccess,
	getBoothUsersTableColumnNamesFail,
	getBoothUsersTableColumnNamesSuccess,
	updateBoothUsersFail,
	updateBoothUsersSuccess,
} from "./actions";

import {
	activateDeactivateBoothUsers,
	addBoothUsers,
	deleteBoothUsers,
	getBoothUsers,
	getBoothUsersTableColumnNames,
	updateBoothUsers
} from "../../helpers/fakebackend_helper";


// Fetch BoothUsers 
function* fetchBoothUsers({payload: boothuser}) {
	try {
		const response = yield call(getBoothUsers, boothuser);
			yield put(getBoothUsersSuccess(response));	
	} catch (error) {
		yield put(getBoothUsersSuccess(error));
	}
}

// Fetch BoothUsers Table Columns Names 
function* fetchBoothUsersTableColumnNames(moduleName) {
	try {
		const response = yield call(getBoothUsersTableColumnNames, moduleName);
		yield put(getBoothUsersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getBoothUsersTableColumnNamesFail(error));
	}
}


// Add BoothUsers  
function* onAddBoothUsers({ payload: boothuser }) {
	try {
		const response = yield call(addBoothUsers, boothuser);
			yield put(addBoothUsersSuccess(response));	
	} catch (error) {
		yield put(addBoothUsersFail(error));
	}
}

// Update BoothUsers  
function* onUpdateBoothUsers({ payload:boothuser }) {
	try {
		const response = yield call(updateBoothUsers,boothuser);
		yield put(updateBoothUsersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateBoothUsersFail(error));
	}
}

// Delete BoothUsers
function* onDeleteBoothUsers({ payload: boothuser }) {
	try {
		const response = yield call(deleteBoothUsers, boothuser);
		yield put(deleteBoothUsersSuccess(response))
	} catch (error) {
		yield put(deleteBoothUsersFail(error))
	}
}

function* onActivateDeactivate({payload: boothuser}) {
	try{
		yield put(activateDeactivateBoothUsersSuccess(boothuser))
		yield call(activateDeactivateBoothUsers, boothuser);
	} catch (error) {
		yield put(activateDeactivateBoothUsersFail(error))
	}
}


export function* watchBoothUsers() {
	yield takeEvery(GET_BOOTHUSERS, fetchBoothUsers);
	yield takeEvery(GET_BOOTHUSERS_TABLE_COLUMN_NAMES, fetchBoothUsersTableColumnNames);
	yield takeEvery(ADD_BOOTHUSERS, onAddBoothUsers);
	yield takeEvery(UPDATE_BOOTHUSERS, onUpdateBoothUsers);
	yield takeEvery(DELETE_BOOTHUSERS, onDeleteBoothUsers);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_BOOTHUSERS, onActivateDeactivate);

}

function* BoothUsersSaga() {
	yield all([fork(watchBoothUsers)]);
}

export default BoothUsersSaga;