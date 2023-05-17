import {
    ADD_VOTERSMANAGEMENT,
    ADD_VOTERSMANAGEMENT_FAIL,
    ADD_VOTERSMANAGEMENT_SUCCESS,
    DELETE_VOTERSMANAGEMENT,
    DELETE_VOTERSMANAGEMENT_FAIL,
    DELETE_VOTERSMANAGEMENT_SUCCESS,
    GET_VOTERSMANAGEMENT,
    GET_VOTERSMANAGEMENT_FAIL,
    GET_VOTERSMANAGEMENT_SUCCESS,
    GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES,
    GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_FAIL,
    GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_SUCCESS,
    ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT,
    ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_FAIL,
    ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_SUCCESS,
    UPDATE_VOTERSMANAGEMENT,
    UPDATE_VOTERSMANAGEMENT_FAIL,
    UPDATE_VOTERSMANAGEMENT_SUCCESS
  } from "./actionTypes"
  
  
  export const getVotersManagement = ({classNo}) => ({
    type: GET_VOTERSMANAGEMENT,
    classNo: classNo,
  });
  
  export const getVotersManagementSuccess = votersmanagement => ({
    type: GET_VOTERSMANAGEMENT_SUCCESS,
    payload: votersmanagement,
  });
  
  export const getVotersManagementFail = error => ({
    type: GET_VOTERSMANAGEMENT_FAIL,
    payload: error,
  });
  
  export const getVotersManagementTableColumnNames = () => ({
    type: GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES,
    moduleName: "VOTERSMANAGEMENT"
  });
  
  export const getVotersManagementTableColumnNamesSuccess = columnNames => ({
    type: GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getVotersManagementTableColumnNamesFail = error => ({
    type: GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const addVotersManagement = votersmanagement => ({
    type: ADD_VOTERSMANAGEMENT,
    payload: votersmanagement,
  });
  
  export const addVotersManagementSuccess = votersmanagement => ({
    type: ADD_VOTERSMANAGEMENT_SUCCESS,
    payload: votersmanagement,
  });
  
  export const addVotersManagementFail = error => ({
    type: ADD_VOTERSMANAGEMENT_FAIL,
    payload: error,
  });
  
  export const updateVotersManagement = (votersmanagement) => ({
    type: UPDATE_VOTERSMANAGEMENT,
    payload: votersmanagement
  });
  
  export const updateVotersManagementSuccess = votersmanagement => ({
    type: UPDATE_VOTERSMANAGEMENT_SUCCESS,
    payload: votersmanagement,
  });
  
  export const updateVotersManagementFail = error => ({
    type: UPDATE_VOTERSMANAGEMENT_FAIL,
    payload: error,
  });
  
  export const deleteVotersManagement = votersmanagement => ({
    type: DELETE_VOTERSMANAGEMENT,
    payload: votersmanagement,
  });
  
  export const deleteVotersManagementSuccess = votersmanagement => ({
    type: DELETE_VOTERSMANAGEMENT_SUCCESS,
    payload: votersmanagement,
  });
  
  export const deleteVotersManagementFail = error => ({
    type: DELETE_VOTERSMANAGEMENT_FAIL,
    payload: error,
  });
  
  export const activateDeactivateVotersManagement = votersmanagement => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT,
    payload: votersmanagement
  });
  
  export const activateDeactivateVotersManagementSuccess = votersmanagement => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_SUCCESS,
    payload: votersmanagement
  });
  
  export const activateDeactivateVotersManagementFail = error => ({
    type: ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_FAIL,
    payload: error
  });
  
  
  
  