import {
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




