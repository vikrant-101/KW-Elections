import {
  ADD_MY_REFERED_VOTERS,
  ADD_MY_REFERED_VOTERS_FAIL,
  ADD_MY_REFERED_VOTERS_SUCCESS,
  DELETE_MY_REFERED_VOTERS,
  DELETE_MY_REFERED_VOTERS_FAIL,
  DELETE_MY_REFERED_VOTERS_SUCCESS,
  GET_MY_REFERED_VOTERS,
  GET_MY_REFERED_VOTERS_FAIL,
  GET_MY_REFERED_VOTERS_SUCCESS,
  GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES,
  GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS,
  ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_SUCCESS,
  UPDATE_MY_REFERED_VOTERS,
  UPDATE_MY_REFERED_VOTERS_FAIL,
  UPDATE_MY_REFERED_VOTERS_SUCCESS
} from "./actionTypes"


export const getMyReferedVoters = () => ({
  type: GET_MY_REFERED_VOTERS,
});

export const getMyReferedVotersSuccess = myReferedVoters => ({
  type: GET_MY_REFERED_VOTERS_SUCCESS,
  payload: myReferedVoters,
});

export const getMyReferedVotersFail = error => ({
  type: GET_MY_REFERED_VOTERS_FAIL,
  payload: error,
});

export const getMyReferedVotersTableColumnNames = () => ({
  type: GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES,
  moduleName: "REFERVOTERS"
});

export const getMyReferedVotersTableColumnNamesSuccess = columnNames => ({
  type: GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getMyReferedVotersTableColumnNamesFail = error => ({
  type: GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addMyReferedVoters = myReferedVoters => ({
  type: ADD_MY_REFERED_VOTERS,
  payload: myReferedVoters,
});

export const addMyReferedVotersSuccess = myReferedVoters => ({
  type: ADD_MY_REFERED_VOTERS_SUCCESS,
  payload: myReferedVoters,
});

export const addMyReferedVotersFail = error => ({
  type: ADD_MY_REFERED_VOTERS_FAIL,
  payload: error,
});

export const updateMyReferedVoters = (myReferedVoters) => ({
  type: UPDATE_MY_REFERED_VOTERS,
  payload: myReferedVoters
});

export const updateMyReferedVotersSuccess = myReferedVoters => ({
  type: UPDATE_MY_REFERED_VOTERS_SUCCESS,
  payload: myReferedVoters,
});

export const updateMyReferedVotersFail = error => ({
  type: UPDATE_MY_REFERED_VOTERS_FAIL,
  payload: error,
});

export const deleteMyReferedVoters = myReferedVoters => ({
  type: DELETE_MY_REFERED_VOTERS,
  payload: myReferedVoters,
});

export const deleteMyReferedVotersSuccess = myReferedVoters => ({
  type: DELETE_MY_REFERED_VOTERS_SUCCESS,
  payload: myReferedVoters,
});

export const deleteMyReferedVotersFail = error => ({
  type: DELETE_MY_REFERED_VOTERS_FAIL,
  payload: error,
});

export const activateDeactivateMyReferedVoters = myReferedVoters => ({
  type: ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS,
  payload: myReferedVoters
});

export const activateDeactivateMyReferedVotersSuccess = myReferedVoters => ({
  type: ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_SUCCESS,
  payload: myReferedVoters
});

export const activateDeactivateMyReferedVotersFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_FAIL,
  payload: error
});



