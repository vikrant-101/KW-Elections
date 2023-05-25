import {
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES,
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES_FAIL,
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES_SUCCESS,
  GET_ELECTIONDAY_REPORT,
  GET_ELECTIONDAY_REPORT_SUCCESS,
  GET_ELECTIONDAY_REPORT_FAIL,
} from "./actionTypes";

export const getElectionDayReport = (userId) => ({
  type: GET_ELECTIONDAY_REPORT,
  payload: userId,
});

export const getElectionDayReportSuccess = (electionDayReport) => {
  return {
    type: GET_ELECTIONDAY_REPORT_SUCCESS,
    payload: electionDayReport,
  };
};

export const getElectionDayReportFail = (error) => ({
  type: GET_ELECTIONDAY_REPORT_FAIL,
  payload: error,
});

export const getElectionDayReportColumnNames = () => ({
  type: GET_ELECTIONDAY_REPORT_COLUMN_NAMES,
  moduleName: "ELECTIONSDAY_REPORT",
});

export const getElectionDayReportColumnNamesSuccess = (columnNames) => {
  return {
    type: GET_ELECTIONDAY_REPORT_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  };
};

export const getElectionDayReportColumnNamesFail = (error) => ({
  type: GET_ELECTIONDAY_REPORT_COLUMN_NAMES_FAIL,
  payload: error,
});
