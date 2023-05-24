import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_USERS,
	GET_USERS_TABLE_COLUMN_NAMES,
	ADD_USERS,
	UPDATE_USERS,
	DELETE_USERS,
	ON_ACTIVATE_DEACTIVATE_USERS,
} from "./actionTypes";

import {
	activateDeactivateUsersFail,
	activateDeactivateUsersSuccess,
	addUsersFail,
	addUsersSuccess,
	deleteUsersFail,
	deleteUsersSuccess,
	getUsersFail,
	getUsersSuccess,
	getUsersTableColumnNamesFail,
	getUsersTableColumnNamesSuccess,
	updateUsersFail,
	updateUsersSuccess
} from "./actions";

import {
	activateDeactivateUsers,
	addUsers,
	deleteUsers,
	getUsers,
	getUsersTableColumnNames,
	updateUsers
} from "../../helpers/fakebackend_helper";


// Fetch Users 
function* fetchUsers({payload: users}) {
	try {
		const response = yield call(getUsers, users);
		yield put(getUsersSuccess(response.Data));
	} catch (error) {
		yield put(getUsersFail(error));
	}
}

// Fetch Users Table Columns Names 
function* fetchUsersTableColumnNames(moduleName) {
	try {
		const response = yield call(getUsersTableColumnNames, moduleName);
		yield put(getUsersTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getUsersTableColumnNamesFail(error));
	}
}


// Add Users  
function* onAddUsers({ payload: users }) {
	try {
		const response = yield call(addUsers, users);
			yield put(addUsersSuccess(response));	
	} catch (error) {
		yield put(addUsersFail(error));
	}
}

// Update Users  
function* onUpdateUsers({ payload:users }) {
	try {
		const response = yield call(updateUsers,users);
		yield put(updateUsersSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateUsersFail(error));
	}
}

// Delete Users
function* onDeleteUsers({ payload: users }) {
	try {
		const response = yield call(deleteUsers, users);
		yield put(deleteUsersSuccess(response))
	} catch (error) {
		yield put(deleteUsersFail(error))
	}
}

function* onActivateDeactivate({payload: users}) {
	try{
		yield put(activateDeactivateUsersSuccess(users))
		yield call(activateDeactivateUsers, users);
	} catch (error) {
		yield put(activateDeactivateUsersFail(error))
	}
}


export function* watchUsers() {
	yield takeEvery(GET_USERS, fetchUsers);
	yield takeEvery(GET_USERS_TABLE_COLUMN_NAMES, fetchUsersTableColumnNames);
	yield takeEvery(ADD_USERS, onAddUsers);
	yield takeEvery(UPDATE_USERS, onUpdateUsers);
	yield takeEvery(DELETE_USERS, onDeleteUsers);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_USERS, onActivateDeactivate);

}

function* UsersSaga() {
	yield all([fork(watchUsers)]);
}

export default UsersSaga;