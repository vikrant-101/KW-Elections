import {
	takeEvery,
	fork,
	put,
	all,
	call
} from "redux-saga/effects";

// Login Redux States
import {
	GET_ROLES,
	GET_ROLES_TABLE_COLUMN_NAMES,
	ADD_ROLES,
	UPDATE_ROLES,
	DELETE_ROLES,
	ON_ACTIVATE_DEACTIVATE_ROLES,
} from "./actionTypes";

import {
	activateDeactivateRolesFail,
	activateDeactivateRolesSuccess,
	addRolesFail,
	addRolesSuccess,
	deleteRolesFail,
	deleteRolesSuccess,
	getRolesFail,
	getRolesSuccess,
	getRolesTableColumnNamesFail,
	getRolesTableColumnNamesSuccess,
	updateRolesFail,
	updateRolesSuccess
} from "./actions";

import {
	activateDeactivateRoles,
	addRoles,
	deleteRoles,
	getRoles,
	getRolesTableColumnNames,
	updateRoles
} from "../../helpers/fakebackend_helper";


// Fetch Users 
function* fetchRoles({payload: roles}) {
	try {
		const response = yield call(getRoles, roles);
		yield put(getRolesSuccess(response.Data));
	} catch (error) {
		yield put(getRolesFail(error));
	}
}

// Fetch Users Table Columns Names 
function* fetchRolesTableColumnNames(moduleName) {
	try {
		const response = yield call(getRolesTableColumnNames, moduleName);
		yield put(getRolesTableColumnNamesSuccess(response.Data));
	} catch (error) {
		yield put(getRolesTableColumnNamesFail(error));
	}
}


// Add Users  
function* onAddUsers({ payload: users }) {
	try {
		const response = yield call(addRoles, users);
			yield put(addRolesSuccess(response));	
	} catch (error) {
		yield put(addRolesFail(error));
	}
}

// Update Users  
function* onUpdateRoles({ payload:users }) {
	try {
		const response = yield call(updateRoles,users);
		yield put(updateRolesSuccess(response));
	} catch (error) {
		console.log(error)
		yield put(updateRolesFail(error));
	}
}

// Delete Users
function* onDeleteRoles({ payload: users }) {
	try {
		const response = yield call(deleteRoles, users);
		yield put(deleteRolesSuccess(response))
	} catch (error) {
		yield put(deleteRolesFail(error))
	}
}

function* onActivateDeactivate({payload: users}) {
	try{
		yield put(activateDeactivateRolesSuccess(users))
		yield call(activateDeactivateRoles, users);
	} catch (error) {
		yield put(activateDeactivateRolesFail(error))
	}
}


export function* watchUsers() {
	yield takeEvery(GET_ROLES, fetchRoles);
	yield takeEvery(GET_ROLES_TABLE_COLUMN_NAMES, fetchRolesTableColumnNames);
	yield takeEvery(ADD_ROLES, onAddUsers);
	yield takeEvery(UPDATE_ROLES, onUpdateRoles);
	yield takeEvery(DELETE_ROLES, onDeleteRoles);
	yield takeEvery(ON_ACTIVATE_DEACTIVATE_ROLES, onActivateDeactivate);

}

function* UsersSaga() {
	yield all([fork(watchUsers)]);
}

export default UsersSaga;