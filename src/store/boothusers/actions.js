import {
  ADD_BOOTHUSERS,
  ADD_BOOTHUSERS_FAIL,
  ADD_BOOTHUSERS_SUCCESS,
  DELETE_BOOTHUSERS,
  DELETE_BOOTHUSERS_FAIL,
  DELETE_BOOTHUSERS_SUCCESS,
  GET_BOOTHUSERS,
  GET_BOOTHUSERS_FAIL,
  GET_BOOTHUSERS_SUCCESS,
  GET_BOOTHUSERS_TABLE_COLUMN_NAMES,
  GET_BOOTHUSERS_TABLE_COLUMN_NAMES_FAIL,
  GET_BOOTHUSERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_BOOTHUSERS,
  ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_SUCCESS,
  UPDATE_BOOTHUSERS,
  UPDATE_BOOTHUSERS_FAIL,
  UPDATE_BOOTHUSERS_SUCCESS
} from "./actionTypes"


export const getBoothUsers = (boothuser) => ({
  type: GET_BOOTHUSERS,
  payload:boothuser
});

export const getBoothUsersSuccess = boothuser => ({
  type: GET_BOOTHUSERS_SUCCESS,
  payload: boothuser,
});

export const getBoothUsersFail = error => ({
  type: GET_BOOTHUSERS_FAIL,
  payload: error,
});

export const getBoothUsersTableColumnNames = () => ({
  type: GET_BOOTHUSERS_TABLE_COLUMN_NAMES,
  moduleName: "BOOTH_USERS"
});

export const getBoothUsersTableColumnNamesSuccess = columnNames => ({
  type: GET_BOOTHUSERS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getBoothUsersTableColumnNamesFail = error => ({
  type: GET_BOOTHUSERS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addBoothUsers = boothuser => ({
  type: ADD_BOOTHUSERS,
  payload: boothuser,
});

export const addBoothUsersSuccess = boothuser => ({
  type: ADD_BOOTHUSERS_SUCCESS,
  payload: boothuser,
});

export const addBoothUsersFail = error => ({
  type: ADD_BOOTHUSERS_FAIL,
  payload: error,
});

export const updateBoothUsers = (boothuser) => ({
  type: UPDATE_BOOTHUSERS,
  payload: boothuser
});

export const updateBoothUsersSuccess = boothuser => ({
  type: UPDATE_BOOTHUSERS_SUCCESS,
  payload: boothuser,
});

export const updateBoothUsersFail = error => ({
  type: UPDATE_BOOTHUSERS_FAIL,
  payload: error,
});

export const deleteBoothUsers = boothuser => ({
  type: DELETE_BOOTHUSERS,
  payload: boothuser,
});

export const deleteBoothUsersSuccess = boothuser => ({
  type: DELETE_BOOTHUSERS_SUCCESS,
  payload: boothuser,
});

export const deleteBoothUsersFail = error => ({
  type: DELETE_BOOTHUSERS_FAIL,
  payload: error,
});

export const activateDeactivateBoothUsers= boothuser => ({
  type: ON_ACTIVATE_DEACTIVATE_BOOTHUSERS,
  payload: boothuser
});

export const activateDeactivateBoothUsersSuccess = boothuser => ({
  type: ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_SUCCESS,
  payload: boothuser
});

export const activateDeactivateBoothUsersFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_FAIL,
  payload: error
});



