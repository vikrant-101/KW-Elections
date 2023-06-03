import {
  GET_AGE_COUNT,
  GET_AGE_COUNT_FAIL,
  GET_AGE_COUNT_SUCCESS,
  GET_COUNT,
  GET_COUNT_FAIL,
  GET_COUNT_SUCCESS,
  GET_TOTAL_COUNT,
  GET_TOTAL_COUNT_FAIL,
  GET_TOTAL_COUNT_SUCCESS,
  GET_VOTERS_STATISTICS,
  GET_VOTERS_STATISTICS_FAIL,
  GET_VOTERS_STATISTICS_SUCCESS,
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

export const getAgeCount = ageCount => ({
  type: GET_AGE_COUNT,
  payload: ageCount
});

export const getAgeCountSuccess = ageCount => ({
  type: GET_AGE_COUNT_SUCCESS,
  payload: ageCount
});

export const getAgeCountFail = error => ({
  type: GET_AGE_COUNT_FAIL,
  payload: error
});

export const getVotersStatistics = votersStats => ({
  type: GET_VOTERS_STATISTICS,
  payload: votersStats
});

export const getVotersStatisticsSuccess = votersStats => ({
  type: GET_VOTERS_STATISTICS_SUCCESS,
  payload: votersStats
});

export const getVotersStatisticsFail = error => ({
  type: GET_VOTERS_STATISTICS_FAIL,
  payload: error
});


