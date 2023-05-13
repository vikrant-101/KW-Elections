import {
  ADD_USERS,
  ADD_USERS_FAIL,
  ADD_USERS_SUCCESS,
  DELETE_USERS,
  DELETE_USERS_FAIL,
  DELETE_USERS_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_TABLE_COLUMN_NAMES,
  GET_USERS_TABLE_COLUMN_NAMES_FAIL,
  GET_USERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_USERS,
  ON_ACTIVATE_DEACTIVATE_USERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_USERS_SUCCESS,
  UPDATE_USERS,
  UPDATE_USERS_FAIL,
  UPDATE_USERS_SUCCESS
} from "./actionTypes"


export const getUsers = (users) => ({
  type: GET_USERS,
  payload:users
});

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const getUsersTableColumnNames = () => ({
  type: GET_USERS_TABLE_COLUMN_NAMES,
  moduleName: "USERS"
});

export const getUsersTableColumnNamesSuccess = columnNames => ({
  type: GET_USERS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getUsersTableColumnNamesFail = error => ({
  type: GET_USERS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addUsers = users => ({
  type: ADD_USERS,
  payload: users,
});

export const addUsersSuccess = users => ({
  type: ADD_USERS_SUCCESS,
  payload: users,
});

export const addUsersFail = error => ({
  type: ADD_USERS_FAIL,
  payload: error,
});

export const updateUsers = (users) => ({
  type: UPDATE_USERS,
  payload: users
});

export const updateUsersSuccess = users => ({
  type: UPDATE_USERS_SUCCESS,
  payload: users,
});

export const updateUsersFail = error => ({
  type: UPDATE_USERS_FAIL,
  payload: error,
});

export const deleteUsers = users => ({
  type: DELETE_USERS,
  payload: users,
});

export const deleteUsersSuccess = users => ({
  type: DELETE_USERS_SUCCESS,
  payload: users,
});

export const deleteUsersFail = error => ({
  type: DELETE_USERS_FAIL,
  payload: error,
});

export const activateDeactivateUsers= users => ({
  type: ON_ACTIVATE_DEACTIVATE_USERS,
  payload: users
});

export const activateDeactivateUsersSuccess = users => ({
  type: ON_ACTIVATE_DEACTIVATE_USERS_SUCCESS,
  payload: users
});

export const activateDeactivateUsersFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_USERS_FAIL,
  payload: error
});



