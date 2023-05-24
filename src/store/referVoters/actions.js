import {
    ADD_REFERVOTERS,
    ADD_REFERVOTERS_FAIL,
    ADD_REFERVOTERS_SUCCESS,
    DELETE_REFERVOTERS,
    DELETE_REFERVOTERS_FAIL,
    DELETE_REFERVOTERS_SUCCESS,
    GET_REFERVOTERS,
    GET_REFERVOTERS_FAIL,
    GET_REFERVOTERS_SUCCESS,
    GET_REFERVOTERS_TABLE_COLUMN_NAMES,
    GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL,
    GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    ON_ACTIVATE_DEACTIVATE_REFERVOTERS,
    ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL,
    ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS,
    UPDATE_REFERVOTERS,
    UPDATE_REFERVOTERS_FAIL,
    UPDATE_REFERVOTERS_SUCCESS
  } from "./actionTypes"
  
  
  export const getReferVoters = (refervoters) => ({
    type: GET_REFERVOTERS,
    payload: refervoters
  });
  
  export const getReferVotersSuccess = refervoters => ({
    type: GET_REFERVOTERS_SUCCESS,
    payload: refervoters,
  });
  
  export const getReferVotersFail = error => ({
    type: GET_REFERVOTERS_FAIL,
    payload: error,
  });
  
  export const getReferVotersTableColumnNames = () => ({
    type: GET_REFERVOTERS_TABLE_COLUMN_NAMES,
    moduleName: "REFERVOTERS"
  });
  
  export const getReferVotersTableColumnNamesSuccess = columnNames => ({
    type: GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getReferVotersTableColumnNamesFail = error => ({
    type: GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const addReferVoters = refervoters => ({
    type: ADD_REFERVOTERS,
    payload: refervoters,
  });
  
  export const addReferVotersSuccess = refervoters => ({
    type: ADD_REFERVOTERS_SUCCESS,
    payload: refervoters,
  });
  
  export const addReferVotersFail = error => ({
    type: ADD_REFERVOTERS_FAIL,
    payload: error,
  });
  
  export const updateReferVoters = (refervoters) => ({
    type: UPDATE_REFERVOTERS,
    payload: refervoters
  });
  
  export const updateReferVotersSuccess = refervoters => ({
    type: UPDATE_REFERVOTERS_SUCCESS,
    payload: refervoters,
  });
  
  export const updateReferVotersFail = error => ({
    type: UPDATE_REFERVOTERS_FAIL,
    payload: error,
  });
  
  export const deleteReferVoters = refervoters => ({
    type: DELETE_REFERVOTERS,
    payload: refervoters,
  });
  
  export const deleteReferVotersSuccess = refervoters => ({
    type: DELETE_REFERVOTERS_SUCCESS,
    payload: refervoters,
  });
  
  export const deleteReferVotersFail = error => ({
    type: DELETE_REFERVOTERS_FAIL,
    payload: error,
  });
  
  export const activateDeactivateReferVoters = refervoters => ({
    type: ON_ACTIVATE_DEACTIVATE_REFERVOTERS,
    payload: refervoters
  });
  
  export const activateDeactivateReferVotersSuccess = refervoters => ({
    type: ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS,
    payload: refervoters
  });
  
  export const activateDeactivateReferVotersFail = error => ({
    type: ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL,
    payload: error
  });