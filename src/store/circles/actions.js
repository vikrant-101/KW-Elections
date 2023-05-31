import {
  ADD_CIRCLES,
  ADD_CIRCLES_FAIL,
  ADD_CIRCLES_SUCCESS,
  DELETE_CIRCLES,
  DELETE_CIRCLES_FAIL,
  DELETE_CIRCLES_SUCCESS,
  GET_CIRCLES,
  GET_CIRCLES_FAIL,
  GET_CIRCLES_SUCCESS,
  GET_CIRCLES_TABLE_COLUMN_NAMES,
  GET_CIRCLES_TABLE_COLUMN_NAMES_FAIL,
  GET_CIRCLES_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_CIRCLES,
  ON_ACTIVATE_DEACTIVATE_CIRCLES_FAIL,
  ON_ACTIVATE_DEACTIVATE_CIRCLES_SUCCESS,
  UPDATE_CIRCLES,
  UPDATE_CIRCLES_FAIL,
  UPDATE_CIRCLES_SUCCESS,
  GET_CIRCLES_BY_ELECTIONID,
  GET_CIRCLES_BY_ELECTIONID_FAIL,
  GET_CIRCLES_BY_ELECTIONID_SUCCESS
} from "./actionTypes"


export const getCircles = () => ({
  type: GET_CIRCLES,
});

export const getCirclesSuccess = circles => ({
  type: GET_CIRCLES_SUCCESS,
  payload: circles,
});

export const getCirclesFail = error => ({
  type: GET_CIRCLES_FAIL,
  payload: error,
});

export const getCirclesByElectionID = (electionID) => ({
  type: GET_CIRCLES_BY_ELECTIONID,
  payload: electionID
});

export const getCirclesByElectionIDSuccess = circles => ({
  type: GET_CIRCLES_BY_ELECTIONID_SUCCESS,
  payload: circles,
});

export const getCirclesByElectionIDFail = error => ({
  type: GET_CIRCLES_BY_ELECTIONID_FAIL,
  payload: error,
});

export const getCirclesTableColumnNames = () => ({
  type: GET_CIRCLES_TABLE_COLUMN_NAMES,
  moduleName: "CIRCLES"
});

export const getCirclesTableColumnNamesSuccess = columnNames => ({
  type: GET_CIRCLES_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getCirclesTableColumnNamesFail = error => ({
  type: GET_CIRCLES_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});

export const addCircles = circles => ({
  type: ADD_CIRCLES,
  payload: circles,
});

export const addCirclesSuccess = circles => ({
  type: ADD_CIRCLES_SUCCESS,
  payload: circles,
});

export const addCirclesFail = error => ({
  type: ADD_CIRCLES_FAIL,
  payload: error,
});

export const updateCircles = (circles) => ({
  type: UPDATE_CIRCLES,
  payload: circles
});

export const updateCirclesSuccess = circles => ({
  type: UPDATE_CIRCLES_SUCCESS,
  payload: circles,
});

export const updateCirclesFail = error => ({
  type: UPDATE_CIRCLES_FAIL,
  payload: error,
});

export const deleteCircles = circles => ({
  type: DELETE_CIRCLES,
  payload: circles,
});

export const deleteCirclesSuccess = circles => ({
  type: DELETE_CIRCLES_SUCCESS,
  payload: circles,
});

export const deleteCirclesFail = error => ({
  type: DELETE_CIRCLES_FAIL,
  payload: error,
});

export const activateDeactivateCircles = circles => ({
  type: ON_ACTIVATE_DEACTIVATE_CIRCLES,
  payload: circles
});

export const activateDeactivateCirclesSuccess = circles => ({
  type: ON_ACTIVATE_DEACTIVATE_CIRCLES_SUCCESS,
  payload: circles
});

export const activateDeactivateCirclesFail = error => ({
  type: ON_ACTIVATE_DEACTIVATE_CIRCLES_FAIL,
  payload: error
});



