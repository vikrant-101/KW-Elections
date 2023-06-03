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
    GET_PRINTDETAIL,
    GET_PRINTDETAIL_FAIL,
    GET_PRINTDETAIL_SUCCESS,
    GET_VOTERS_TABLE_COLUMN_NAMES,
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
    UPDATE_VOTERS_SUCCESS,
    GET_AREANAME,
    GET_AREANAME_FAIL,
    GET_AREANAME_SUCCESS,
    GET_FAMILYNAME,
    GET_FAMILYNAME_FAIL,
    GET_FAMILYNAME_SUCCESS,
    GET_NEXT_VOTERS,
    GET_NEXT_VOTERS_FAIL,
    GET_NEXT_VOTERS_SUCCESS,
    RESET_VOTERS
  } from "./actionTypes"
  
  
  export const getVoters = (searchQuery) => ({
    type: GET_VOTERS,
    payload: searchQuery
  });
  
  export const getVotersSuccess = voters => {
    return {
    type: GET_VOTERS_SUCCESS,
    payload: voters,
  }};
  
  export const getVotersFail = error => ({
    type: GET_VOTERS_FAIL,
    payload: error,
  });

  export const getPrintDetail = ({userID}) => ({
    type: GET_PRINTDETAIL,
    userID: userID
  });
  
  export const getPrintDetailSuccess = printDetail => ({
    type: GET_PRINTDETAIL_SUCCESS,
    payload: printDetail,
  });
  
  export const getPrintDetailFail = error => ({
    type: GET_PRINTDETAIL_FAIL,
    payload: error,
  });

  export const getVotersTableColumnNames = () => ({
    type: GET_VOTERS_TABLE_COLUMN_NAMES,
    moduleName: "ALLVOTERSLIST"
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

  export const getAreaName = (voters) => ({
    type: GET_AREANAME,
    payload: voters
  });
  
  export const getAreaNameSuccess = voters => {
    return {
    type: GET_AREANAME_SUCCESS,
    payload: voters,
  }};
  
  export const getAreaNameFail = error => ({
    type: GET_AREANAME_FAIL,
    payload: error,
  });

  export const getFamilyName = (voters) => ({
    type: GET_FAMILYNAME,
    payload: voters
  });
  
  export const getFamilyNameSuccess = voters => {
    return {
    type: GET_FAMILYNAME_SUCCESS,
    payload: voters,
  }};
  
  export const getFamilyNameFail = error => ({
    type: GET_FAMILYNAME_FAIL,
    payload: error,
  });

  export const resetVoters = () => ({
    type: RESET_VOTERS
  });
  

  export const getNextVoters = (nextVoters) => ({
    type:GET_NEXT_VOTERS,
    payload: nextVoters
  });
  
  export const getNextVotersSuccess = voters => {
    return {
    type: GET_NEXT_VOTERS_SUCCESS,
    payload: voters,
  }};
  
  export const getNextVotersFail = error => ({
    type: GET_NEXT_VOTERS_FAIL,
    payload: error,
  });
  
  