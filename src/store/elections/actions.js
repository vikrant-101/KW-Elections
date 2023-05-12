import {
  ADD_ELECTIONS,
  ADD_ELECTIONS_FAIL,
  ADD_ELECTIONS_SUCCESS,
  DELETE_ELECTIONS,
  DELETE_ELECTIONS_FAIL,
  DELETE_ELECTIONS_SUCCESS,
  GET_ELECTIONS,
  GET_ELECTIONS_FAIL,
  GET_ELECTIONS_SUCCESS,
  GET_ELECTIONS_TABLE_COLUMN_NAMES,
  GET_ELECTIONS_TABLE_COLUMN_NAMES_FAIL,
  GET_ELECTIONS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_ELECTIONS,
  ON_ACTIVATE_DEACTIVATE_ELECTIONS_FAIL,
  ON_ACTIVATE_DEACTIVATE_ELECTIONS_SUCCESS,
  UPDATE_ELECTIONS,
  UPDATE_ELECTIONS_FAIL,
  UPDATE_ELECTIONS_SUCCESS
} from "./actionTypes"


export const getElections = () => ({
  type: GET_ELECTIONS,
});

export const getElectionsSuccess = elections => ({
  type: GET_ELECTIONS_SUCCESS,
  payload: elections,
});

export const getElectionsFail = error => ({
  type: GET_ELECTIONS_FAIL,
  payload: error,
});

export const getElectionsTableColumnNames = () => ({
  type: GET_ELECTIONS_TABLE_COLUMN_NAMES,
  moduleName: "ELECTIONS"
});

export const getElectionsTableColumnNamesSuccess = columnNames => ({
  type: GET_ELECTIONS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getElectionsTableColumnNamesFail = error => ({
  type: GET_ELECTIONS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addElections = elections => ({
  type: ADD_ELECTIONS,
  payload: elections,
});

export const addElectionsSuccess = elections => ({
  type: ADD_ELECTIONS_SUCCESS,
  payload: elections,
});

export const addElectionsFail = error => ({
  type: ADD_ELECTIONS_FAIL,
  payload: error,
});

export const updateElections = (elections) => ({
  type: UPDATE_ELECTIONS,
  payload: elections
});

export const updateElectionsSuccess = elections => ({
  type: UPDATE_ELECTIONS_SUCCESS,
  payload: elections,
});

export const updateElectionsFail = error => ({
  type: UPDATE_ELECTIONS_FAIL,
  payload: error,
});

export const deleteElections = elections => ({
  type: DELETE_ELECTIONS,
  payload: elections,
});

export const deleteElectionsSuccess = elections => ({
  type: DELETE_ELECTIONS_SUCCESS,
  payload: elections,
});

export const deleteElectionsFail = error => ({
  type: DELETE_ELECTIONS_FAIL,
  payload: error,
});

export const activateDeactivateElections = elections => ({
  type: ON_ACTIVATE_DEACTIVATE_ELECTIONS,
  payload: elections
});

export const activateDeactivateElectionsSuccess = elections => ({
  type: ON_ACTIVATE_DEACTIVATE_ELECTIONS_SUCCESS,
  payload: elections
});

export const activateDeactivateElectionsFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_ELECTIONS_FAIL,
  payload: error
});



