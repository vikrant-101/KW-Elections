import {
  ADD_UPLOAD_VOTERS,
  ADD_UPLOAD_VOTERS_FAIL,
  ADD_UPLOAD_VOTERS_SUCCESS,
  DELETE_UPLOAD_VOTERS,
  DELETE_UPLOAD_VOTERS_FAIL,
  DELETE_UPLOAD_VOTERS_SUCCESS,
  GET_UPLOAD_VOTERS,
  GET_UPLOAD_VOTERS_FAIL,
  GET_UPLOAD_VOTERS_SUCCESS,
  GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES,
  GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS,
  ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_SUCCESS,
  UPDATE_UPLOAD_VOTERS,
  UPDATE_UPLOAD_VOTERS_FAIL,
  UPDATE_UPLOAD_VOTERS_SUCCESS
} from "./actionTypes"


export const getUploadVoters = () => ({
  type: GET_UPLOAD_VOTERS,
});

export const getUploadVotersSuccess = uploadVoters => ({
  type: GET_UPLOAD_VOTERS_SUCCESS,
  payload: uploadVoters,
});

export const getUploadVotersFail = error => ({
  type: GET_UPLOAD_VOTERS_FAIL,
  payload: error,
});

export const getUploadVotersTableColumnNames = () => ({
  type: GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES,
  moduleName: "UPLOADVOTERS"
});

export const getUploadVotersTableColumnNamesSuccess = columnNames => ({
  type: GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getUploadVotersTableColumnNamesFail = error => ({
  type: GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addUploadVoters = uploadVoters => ({
  type: ADD_UPLOAD_VOTERS,
  payload: uploadVoters,
});

export const addUploadVotersSuccess = uploadVoters => ({
  type: ADD_UPLOAD_VOTERS_SUCCESS,
  payload: uploadVoters,
});

export const addUploadVotersFail = error => ({
  type: ADD_UPLOAD_VOTERS_FAIL,
  payload: error,
});

export const updateUploadVoters = (uploadVoters) => ({
  type: UPDATE_UPLOAD_VOTERS,
  payload: uploadVoters
});

export const updateUploadVotersSuccess = uploadVoters => ({
  type: UPDATE_UPLOAD_VOTERS_SUCCESS,
  payload: uploadVoters,
});

export const updateUploadVotersFail = error => ({
  type: UPDATE_UPLOAD_VOTERS_FAIL,
  payload: error,
});

export const deleteUploadVoters = uploadVoters => ({
  type: DELETE_UPLOAD_VOTERS,
  payload: uploadVoters,
});

export const deleteUploadVotersSuccess = uploadVoters => ({
  type: DELETE_UPLOAD_VOTERS_SUCCESS,
  payload: uploadVoters,
});

export const deleteUploadVotersFail = error => ({
  type: DELETE_UPLOAD_VOTERS_FAIL,
  payload: error,
});

export const activateDeactivateUploadVoters = uploadVoters => ({
  type: ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS,
  payload: uploadVoters
});

export const activateDeactivateUploadVotersSuccess = uploadVoters => ({
  type: ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_SUCCESS,
  payload: uploadVoters
});

export const activateDeactivateUploadVotersFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_FAIL,
  payload: error
});



