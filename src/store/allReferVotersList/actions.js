import {
    GET_ALLREFERVOTERSLIST,
    GET_ALLREFERVOTERSLIST_FAIL,
    GET_ALLREFERVOTERSLIST_SUCCESS,
    GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES,
    GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_FAIL,
    GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_SUCCESS,
  } from "./actionTypes"
  
  
  export const getAllReferVotersList = (userID) => ({
    type: GET_ALLREFERVOTERSLIST,
    userID: userID
  });
  
  export const getAllReferVotersListSuccess = allrefervoterslist => ({
    type: GET_ALLREFERVOTERSLIST_SUCCESS,
    payload: allrefervoterslist,
  });
  
  export const getAllReferVotersListFail = error => ({
    type: GET_ALLREFERVOTERSLIST_FAIL,
    payload: error,
  });
  
  export const getAllReferVotersListTableColumnNames = () => ({
    type: GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES,
    moduleName: "ALLREFERVOTERSLIST"
  });
  
  export const getAllReferVotersListTableColumnNamesSuccess = columnNames => ({
    type: GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getAllReferVotersListTableColumnNamesFail = error => ({
    type: GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  

  
  
  
  