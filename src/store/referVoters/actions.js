import {
  ADD_REFER_VOTERS,
  ADD_REFER_VOTERS_FAIL,
  ADD_REFER_VOTERS_SUCCESS,
  DELETE_REFER_VOTERS,
  DELETE_REFER_VOTERS_FAIL,
  DELETE_REFER_VOTERS_SUCCESS,
  GET_REFER_VOTERS,
  GET_REFER_VOTERS_SUCCESS,
  GET_REFER_VOTERS_TABLE_COLUMN_NAMES,
  GET_REFER_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  GET_REFER_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_REFER_VOTERS,
  ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_SUCCESS,
  UPDATE_REFER_VOTERS,
  UPDATE_REFER_VOTERS_FAIL,
  UPDATE_REFER_VOTERS_SUCCESS,
  GET_REFER_VOTERS_FAIL,
} from "./actionTypes"


export const getReferVoters = () => ({
  type: GET_REFER_VOTERS,
});

export const getReferVotersSuccess = referVoters => ({
  type: GET_REFER_VOTERS_SUCCESS,
  payload: referVoters,
});

export const getReferVotersFail = error => ({
  type: GET_REFER_VOTERS_FAIL,
  payload: error,
});

export const getReferVotersTableColumnNames = () => ({
  type: GET_REFER_VOTERS_TABLE_COLUMN_NAMES,
  moduleName: "REFERVOTERS"
});

export const getReferVotersTableColumnNamesSuccess = columnNames => ({
  type: GET_REFER_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getReferVotersTableColumnNamesFail = error => ({
  type: GET_REFER_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addReferVoters = referVoter => ({
  type: ADD_REFER_VOTERS,
  payload: referVoter,
});

export const addReferVotersSuccess = referVoter => ({
  type: ADD_REFER_VOTERS_SUCCESS,
  payload: referVoter,
});

export const addReferVotersFail = error => ({
  type: ADD_REFER_VOTERS_FAIL,
  payload: error,
});

export const updateReferVoters = (circles) => ({
  type: UPDATE_REFER_VOTERS,
  payload: circles
});

export const updateReferVotersSuccess = circles => ({
  type: UPDATE_REFER_VOTERS_SUCCESS,
  payload: circles,
});

export const updateReferVotersFail = error => ({
  type: UPDATE_REFER_VOTERS_FAIL,
  payload: error,
});

export const deleteReferVoters = circles => ({
  type: DELETE_REFER_VOTERS,
  payload: circles,
});

export const deleteReferVotersSuccess = circles => ({
  type: DELETE_REFER_VOTERS_SUCCESS,
  payload: circles,
});

export const deleteReferVotersFail = error => ({
  type: DELETE_REFER_VOTERS_FAIL,
  payload: error,
});

export const activateDeactivateReferVoters = circles => ({
  type: ON_ACTIVATE_DEACTIVATE_REFER_VOTERS,
  payload: circles
});

export const activateDeactivateReferVotersSuccess = circles => ({
  type: ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_SUCCESS,
  payload: circles
});

export const activateDeactivateReferVotersFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_FAIL,
  payload: error
});



