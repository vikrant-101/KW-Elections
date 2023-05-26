import {
    ADD_BOOTHVOTERS,
    ADD_BOOTHVOTERS_FAIL,
    ADD_BOOTHVOTERS_SUCCESS,
    DELETE_BOOTHVOTERS,
    DELETE_BOOTHVOTERS_FAIL,
    DELETE_BOOTHVOTERS_SUCCESS,
    GET_BOOTHUSER_DETAIL,
    GET_BOOTHUSER_DETAIL_FAIL,
    GET_BOOTHUSER_DETAIL_SUCCESS,
    GET_BOOTHVOTERS,
    GET_BOOTHVOTERS_FAIL,
    GET_BOOTHVOTERS_SUCCESS,
    GET_CLASS_BOOTHVOTERS,
    GET_CLASS_BOOTHVOTERS_FAIL,
    GET_CLASS_BOOTHVOTERS_SUCCESS,
    GET_BOOTHVOTERS_TABLE_COLUMN_NAMES,
    GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_FAIL,
    GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS,
    ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_FAIL,
    ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_SUCCESS,
    ON_ACTIVATE_BOOTHVOTERS,
    ON_ACTIVATE_BOOTHVOTERS_FAIL,
    ON_ACTIVATE_BOOTHVOTERS_SUCCESS,
    UPDATE_BOOTHVOTERS,
    UPDATE_BOOTHVOTERS_FAIL,
    UPDATE_BOOTHVOTERS_SUCCESS
  } from "./actionTypes"
  
  
  export const getBoothVoters = (boothvoters) => ({
    type: GET_BOOTHVOTERS,
    payload: boothvoters
  });
  
  export const getBoothVotersSuccess = boothvoters => {
    return {
    type: GET_BOOTHVOTERS_SUCCESS,
    payload: boothvoters,
  }};
  
  export const getBoothVotersFail = error => ({
    type: GET_BOOTHVOTERS_FAIL,
    payload: error,
  });

  export const getBoothUserDetail = ({userID}) => {
    return {
      type: GET_BOOTHUSER_DETAIL,
      userID: userID
  }};
  
  export const getBoothUserDetailSuccess = boothuser => ({
    type: GET_BOOTHUSER_DETAIL_SUCCESS,
    payload: boothuser,
  });
  
  export const getBoothUserDetailFail = error => ({
    type: GET_BOOTHUSER_DETAIL_FAIL,
    payload: error,
  });

  export const getClassBoothVoters = ({classNo}) => ({
    type: GET_CLASS_BOOTHVOTERS,
    classNo: classNo,
  });
  
  export const getClassBoothVotersSuccess = boothvoters => {
    return {
    type: GET_CLASS_BOOTHVOTERS_SUCCESS,
    payload: boothvoters,
  }};
  
  export const getClassBoothVotersFail = error => ({
    type: GET_CLASS_BOOTHVOTERS_FAIL,
    payload: error,
  });
  
  export const getBoothVotersTableColumnNames = () => ({
  
    type: GET_BOOTHVOTERS_TABLE_COLUMN_NAMES,
    moduleName: "BOOTHVOTERS"
  });
  
  export const getBoothVotersTableColumnNamesSuccess = columnNames => ({
    type: GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getBoothVotersTableColumnNamesFail = error => ({
    type: GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const addBoothVoters = boothvoters => ({
    type: ADD_BOOTHVOTERS,
    payload: boothvoters,
  });
  
  export const addBoothVotersSuccess = boothvoters => ({
    type: ADD_BOOTHVOTERS_SUCCESS,
    payload: boothvoters,
  });
  
  export const addBoothVotersFail = error => ({
    type: ADD_BOOTHVOTERS_FAIL,
    payload: error,
  });
  
  export const updateBoothVoters = (boothvoters) => ({
    type: UPDATE_BOOTHVOTERS,
    payload: boothvoters
  });
  
  export const updateBoothVotersSuccess = boothvoters => ({
    type: UPDATE_BOOTHVOTERS_SUCCESS,
    payload: boothvoters,
  });
  
  export const updateBoothVotersFail = error => ({
    type: UPDATE_BOOTHVOTERS_FAIL,
    payload: error,
  });
  
  export const deleteBoothVoters = boothvoters => ({
    type: DELETE_BOOTHVOTERS,
    payload: boothvoters,
  });
  
  export const deleteBoothVotersSuccess = boothvoters => ({
    type: DELETE_BOOTHVOTERS_SUCCESS,
    payload: boothvoters,
  });
  
  export const deleteBoothVotersFail = error => ({
    type: DELETE_BOOTHVOTERS_FAIL,
    payload: error,
  });
  
  export const activateDeactivateBoothVoters = boothvoters => ({
    type: ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS,
    payload: boothvoters
  });
  
  export const activateDeactivateBoothVotersSuccess = boothvoters => ({
    type: ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_SUCCESS,
    payload: boothvoters
  });
  
  export const activateDeactivateBoothVotersFail = error => ({
    type: ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_FAIL,
    payload: error
  });
  
  export const activateBoothVoters = boothvoters => ({
    type: ON_ACTIVATE_BOOTHVOTERS,
    payload: boothvoters
  });
  
  export const activateBoothVotersSuccess = boothvoters => ({
    type: ON_ACTIVATE_BOOTHVOTERS_SUCCESS,
    payload: boothvoters
  });
  
  export const activateBoothVotersFail = error => ({
    type: ON_ACTIVATE_BOOTHVOTERS_FAIL,
    payload: error
  });
  
  
  