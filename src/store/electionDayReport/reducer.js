import {
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES_FAIL,
  GET_ELECTIONDAY_REPORT_COLUMN_NAMES_SUCCESS,
  GET_ELECTIONDAY_REPORT,
  GET_ELECTIONDAY_REPORT_SUCCESS,
  GET_ELECTIONDAY_REPORT_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  electionDayReport: [],
  columnNames: [],
  isLoading: false,
  error: {},
};

const electionDayReport = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ELECTIONDAY_REPORT:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ELECTIONDAY_REPORT_SUCCESS:
      return {
        ...state,
        electionDayReport: action.payload,
        isLoading: false,
      };

    case GET_ELECTIONDAY_REPORT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ELECTIONDAY_REPORT_COLUMN_NAMES_SUCCESS:
      return {
        ...state,
        columnNames: action.payload,
      };

    case GET_ELECTIONDAY_REPORT_COLUMN_NAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default electionDayReport;
