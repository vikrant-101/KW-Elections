import {
    ADD_VOTERS,
    ADD_VOTERS_FAIL,
    ADD_VOTERS_SUCCESS,
    DELETE_VOTERS,
    DELETE_VOTERS_FAIL,
    DELETE_VOTERS_SUCCESS,
    GET_VOTERS,
    GET_VOTERS_FAIL,
    GET_VOTERS_SUCCESS,
    GET_VOTERS_TABLE_COLUMN_NAMES_FAIL,
    GET_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    ON_ACTIVATE_DEACTIVATE_VOTERS,
    ON_ACTIVATE_DEACTIVATE_VOTERS_FAIL,
    ON_ACTIVATE_DEACTIVATE_VOTERS_SUCCESS,
    ON_ACTIVATE_VOTERS,
    ON_ACTIVATE_VOTERS_FAIL,
    ON_ACTIVATE_VOTERS_SUCCESS,
    UPDATE_VOTERS,
    UPDATE_VOTERS_FAIL,
    UPDATE_VOTERS_SUCCESS
  } from "./actionTypes"
  
  
  export const getVoters = () => ({
    type: GET_VOTERS,
  });
  
  export const getVotersSuccess = voters => {
    console.log('voters success: ', voters);
    return {
    type: GET_VOTERS_SUCCESS,
    payload: voters,
  }};
  
  export const getVotersFail = error => ({
    type: GET_VOTERS_FAIL,
    payload: error,
  });
  
  export const getVotersTableColumnNamesSuccess = columnNames => ({
    type: GET_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getVotersTableColumnNamesFail = error => ({
    type: GET_VOTERS_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const addVoters = voters => ({
    type: ADD_VOTERS,
    payload: voters,
  });
  
  export const addVotersSuccess = voters => ({
    type: ADD_VOTERS_SUCCESS,
    payload: voters,
  });
  
  export const addVotersFail = error => ({
    type: ADD_VOTERS_FAIL,
    payload: error,
  });
  
  export const updateVoters = (voters) => ({
    type: UPDATE_VOTERS,
    payload: voters
  });
  
  export const updateVotersSuccess = voters => ({
    type: UPDATE_VOTERS_SUCCESS,
    payload: voters,
  });
  
  export const updateVotersFail = error => ({
    type: UPDATE_VOTERS_FAIL,
    payload: error,
  });
  
  export const deleteVoters = voters => ({
    type: DELETE_VOTERS,
    payload: voters,
  });
  
  export const deleteVotersSuccess = voters => ({
    type: DELETE_VOTERS_SUCCESS,
    payload: voters,
  });
  
  export const deleteVotersFail = error => ({
    type: DELETE_VOTERS_FAIL,
    payload: error,
  });
  
  export const activateDeactivateVoters = voters => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERS,
    payload: voters
  });
  
  export const activateDeactivateVotersSuccess = voters => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERS_SUCCESS,
    payload: voters
  });
  
  export const activateDeactivateVotersFail = error => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERS_FAIL,
    payload: error
  });
  
  export const activateVoters = voters => ({
    type: ON_ACTIVATE_VOTERS,
    payload: voters
  });
  
  export const activateVotersSuccess = voters => ({
    type: ON_ACTIVATE_VOTERS_SUCCESS,
    payload: voters
  });
  
  export const activateVotersFail = error => ({
    type: ON_ACTIVATE_VOTERS_FAIL,
    payload: error
  });
  
  
  