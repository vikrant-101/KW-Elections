import {
  ADD_CANDIDATES,
  ADD_CANDIDATES_FAIL,
  ADD_CANDIDATES_SUCCESS,
  DELETE_CANDIDATES,
  DELETE_CANDIDATES_FAIL,
  DELETE_CANDIDATES_SUCCESS,
  GET_CANDIDATES,
  GET_CANDIDATES_FAIL,
  GET_CANDIDATES_SUCCESS,
  GET_CANDIDATES_TABLE_COLUMN_NAMES,
  GET_CANDIDATES_TABLE_COLUMN_NAMES_FAIL,
  GET_CANDIDATES_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_CANDIDATES,
  ON_ACTIVATE_DEACTIVATE_CANDIDATES_FAIL,
  ON_ACTIVATE_DEACTIVATE_CANDIDATES_SUCCESS,
  UPDATE_CANDIDATES,
  UPDATE_CANDIDATES_FAIL,
  UPDATE_CANDIDATES_SUCCESS
} from "./actionTypes"


export const getCandidates = () => ({
  type: GET_CANDIDATES,
});

export const getCandidatesSuccess = candidates => ({
  type: GET_CANDIDATES_SUCCESS,
  payload: candidates,
});

export const getCandidatesFail = error => ({
  type: GET_CANDIDATES_FAIL,
  payload: error,
});

export const getCandidatesTableColumnNames = () => ({
  type: GET_CANDIDATES_TABLE_COLUMN_NAMES,
  moduleName: "CANDIDATES"
});

export const getCandidatesTableColumnNamesSuccess = columnNames => ({
  type: GET_CANDIDATES_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getCandidatesTableColumnNamesFail = error => ({
  type: GET_CANDIDATES_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addCandidates = candidates => ({
  type: ADD_CANDIDATES,
  payload: candidates,
});

export const addCandidatesSuccess = candidates => ({
  type: ADD_CANDIDATES_SUCCESS,
  payload: candidates,
});

export const addCandidatesFail = error => ({
  type: ADD_CANDIDATES_FAIL,
  payload: error,
});

export const updateCandidates = (candidates) => ({
  type: UPDATE_CANDIDATES,
  payload: candidates
});

export const updateCandidatesSuccess = candidates => ({
  type: UPDATE_CANDIDATES_SUCCESS,
  payload: candidates,
});

export const updateCandidatesFail = error => ({
  type: UPDATE_CANDIDATES_FAIL,
  payload: error,
});

export const deleteCandidates = candidates => ({
  type: DELETE_CANDIDATES,
  payload: candidates,
});

export const deleteCandidatesSuccess = candidates => ({
  type: DELETE_CANDIDATES_SUCCESS,
  payload: candidates,
});

export const deleteCandidatesFail = error => ({
  type: DELETE_CANDIDATES_FAIL,
  payload: error,
});

export const activateDeactivateCandidates = candidates => ({
  type: ON_ACTIVATE_DEACTIVATE_CANDIDATES,
  payload: candidates
});

export const activateDeactivateCandidatesSuccess = candidates => ({
  type: ON_ACTIVATE_DEACTIVATE_CANDIDATES_SUCCESS,
  payload: candidates
});

export const activateDeactivateCandidatesFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_CANDIDATES_FAIL,
  payload: error
});



