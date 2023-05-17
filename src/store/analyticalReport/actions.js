import {
    GET_AREAWISE_REPORT,
    GET_AREAWISE_REPORT_FAIL,
    GET_AREAWISE_REPORT_SUCCESS,
    GET_AREAWISE_TABLE_COLUMN_NAMES,
    GET_AREAWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_AREAWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_SCHOOLWISE_REPORT,
    GET_SCHOOLWISE_REPORT_FAIL,
    GET_SCHOOLWISE_REPORT_SUCCESS,
    GET_SCHOOLWISE_TABLE_COLUMN_NAMES,
    GET_SCHOOLWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_SCHOOLWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_BOOTHWISE_REPORT,
    GET_BOOTHWISE_REPORT_FAIL,
    GET_BOOTHWISE_REPORT_SUCCESS,
    GET_BOOTHWISE_TABLE_COLUMN_NAMES,
    GET_BOOTHWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_BOOTHWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_FAMILYNAMEWISE_REPORT,
    GET_FAMILYNAMEWISE_REPORT_FAIL,
    GET_FAMILYNAMEWISE_REPORT_SUCCESS,
    GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES,
    GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_SUCCESS
  } from "./actionTypes"
  
  
  export const getAreaWiseReport = (userID) => ({
    type: GET_AREAWISE_REPORT,
    userID: userID
  });
  
  export const getAreaWiseSuccess = area => ({
    type: GET_AREAWISE_REPORT_SUCCESS,
    payload: area,
  });
  
  export const getAreaWiseFail = error => ({
    type: GET_AREAWISE_REPORT_FAIL,
    payload: error,
  });

  export const getAreaWiseTableColumnNames = () => ({
    type: GET_AREAWISE_TABLE_COLUMN_NAMES,
    moduleName: "AREAWISEREPORT"
  });
  
  export const getAreaWiseTableColumnNamesSuccess = columnNames => ({
    type: GET_AREAWISE_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getAreaWiseTableColumnNamesFail = error => ({
    type: GET_AREAWISE_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const getSchoolWiseReport = (userID) => ({
    type: GET_SCHOOLWISE_REPORT,
    userID: userID
  });
  
  export const getSchoolWiseSuccess = school => ({
    type: GET_SCHOOLWISE_REPORT_SUCCESS,
    payload: school,
  });
  
  export const getSchoolWiseFail = error => ({
    type: GET_SCHOOLWISE_REPORT_FAIL,
    payload: error,
  });

  export const getSchoolWiseTableColumnNames = () => ({
    type: GET_SCHOOLWISE_TABLE_COLUMN_NAMES,
    moduleName: "SCHOOLWISEREPORT"
  });
  
  export const getSchoolWiseTableColumnNamesSuccess = columnNames => ({
    type: GET_SCHOOLWISE_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getSchoolWiseTableColumnNamesFail = error => ({
    type: GET_SCHOOLWISE_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });

  export const getBoothWiseReport = (userID) => ({
    type: GET_BOOTHWISE_REPORT,
    userID: userID
  });
  
  export const getBoothWiseSuccess = Booth => ({
    type: GET_BOOTHWISE_REPORT_SUCCESS,
    payload: Booth,
  });
  
  export const getBoothWiseFail = error => ({
    type: GET_BOOTHWISE_REPORT_FAIL,
    payload: error,
  });

  export const getBoothWiseTableColumnNames = () => ({
    type: GET_BOOTHWISE_TABLE_COLUMN_NAMES,
    moduleName: "BOOTHWISEREPORT"
  });
  
  export const getBoothWiseTableColumnNamesSuccess = columnNames => ({
    type: GET_BOOTHWISE_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getBoothWiseTableColumnNamesFail = error => ({
    type: GET_BOOTHWISE_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });

  export const getFamilyNameWiseReport = (userID) => ({
    type: GET_FAMILYNAMEWISE_REPORT,
    userID: userID
  });
  
  export const getFamilyNameWiseSuccess = FamilyName => ({
    type: GET_FAMILYNAMEWISE_REPORT_SUCCESS,
    payload: FamilyName,
  });
  
  export const getFamilyNameWiseFail = error => ({
    type: GET_FAMILYNAMEWISE_REPORT_FAIL,
    payload: error,
  });

  export const getFamilyNameWiseTableColumnNames = () => ({
    type: GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES,
    moduleName: "FAMILYNAMEWISEREPORT"
  });
  
  export const getFamilyNameWiseTableColumnNamesSuccess = columnNames => ({
    type: GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getFamilyNameWiseTableColumnNamesFail = error => ({
    type: GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  
  
  