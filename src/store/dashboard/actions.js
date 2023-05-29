import {
  GET_COUNT,
  GET_COUNT_FAIL,
  GET_COUNT_SUCCESS,
  GET_TOTAL_COUNT,
  GET_TOTAL_COUNT_FAIL,
  GET_TOTAL_COUNT_SUCCESS,
} from "./actionTypes"


export const getTotalCount = votersCount => ({
  type: GET_TOTAL_COUNT,
  payload: votersCount
});

export const getTotalCountSuccess = votersCount => ({
  type: GET_TOTAL_COUNT_SUCCESS,
  payload: votersCount,
});

export const getTotalCountFail = error => ({
  type: GET_TOTAL_COUNT_FAIL,
  payload: error,
});

export const getCount = count => ({
  type: GET_COUNT,
  payload: count
});

export const getCountSuccess = count => ({
  type: GET_COUNT_SUCCESS,
  payload: count
});

export const getCountFail = error => ({
  type: GET_COUNT_FAIL,
  payload: error
});




