import {
  ADD_ROLES,
  ADD_ROLES_FAIL,
  ADD_ROLES_SUCCESS,
  DELETE_ROLES,
  DELETE_ROLES_FAIL,
  DELETE_ROLES_SUCCESS,
  GET_ROLES,
  GET_ROLES_FAIL,
  GET_ROLES_SUCCESS,
  GET_ROLES_TABLE_COLUMN_NAMES,
  GET_ROLES_TABLE_COLUMN_NAMES_FAIL,
  GET_ROLES_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_ROLES,
  ON_ACTIVATE_DEACTIVATE_ROLES_FAIL,
  ON_ACTIVATE_DEACTIVATE_ROLES_SUCCESS,
  UPDATE_ROLES,
  UPDATE_ROLES_FAIL,
  UPDATE_ROLES_SUCCESS
} from "./actionTypes"


export const getRoles = (roles) => ({
  type: GET_ROLES,
  payload:roles
});

export const getRolesSuccess = roles => ({
  type: GET_ROLES_SUCCESS,
  payload: roles,
});

export const getRolesFail = error => ({
  type: GET_ROLES_FAIL,
  payload: error,
});

export const getRolesTableColumnNames = () => ({
  type: GET_ROLES_TABLE_COLUMN_NAMES,
  moduleName: "Roles"
});

export const getRolesTableColumnNamesSuccess = columnNames => ({
  type: GET_ROLES_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getRolesTableColumnNamesFail = error => ({
  type: GET_ROLES_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addRoles = roles => ({
  type: ADD_ROLES,
  payload: roles,
});

export const addRolesSuccess = roles => ({
  type: ADD_ROLES_SUCCESS,
  payload: roles,
});

export const addRolesFail = error => ({
  type: ADD_ROLES_FAIL,
  payload: error,
});

export const updateRoles = (roles) => ({
  type: UPDATE_ROLES,
  payload: roles
});

export const updateRolesSuccess = roles => ({
  type: UPDATE_ROLES_SUCCESS,
  payload: roles,
});

export const updateRolesFail = error => ({
  type: UPDATE_ROLES_FAIL,
  payload: error,
});

export const deleteRoles = roles => ({
  type: DELETE_ROLES,
  payload: roles,
});

export const deleteRolesSuccess = roles => ({
  type: DELETE_ROLES_SUCCESS,
  payload: roles,
});

export const deleteRolesFail = error => ({
  type: DELETE_ROLES_FAIL,
  payload: error,
});

export const activateDeactivateRoles= roles => ({
  type: ON_ACTIVATE_DEACTIVATE_ROLES,
  payload: roles
});

export const activateDeactivateRolesSuccess = roles => ({
  type: ON_ACTIVATE_DEACTIVATE_ROLES_SUCCESS,
  payload: roles
});

export const activateDeactivateRolesFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_ROLES_FAIL,
  payload: error
});



