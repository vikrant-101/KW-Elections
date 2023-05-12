import {
  CHECK_PHONE_NUMBER,
  CHECK_PHONE_NUMBER_FAIL,
  CHECK_PHONE_NUMBER_SUCCESS
} from "./actionTypes"


export const checkPhoneNumber = phone => ({
  type: CHECK_PHONE_NUMBER,
  payload: phone
});

export const checkPhoneNumberSuccess = phone => ({
  type: CHECK_PHONE_NUMBER_SUCCESS,
  payload: phone,
});

export const checkPhoneNumberFail = error => ({
  type: CHECK_PHONE_NUMBER_FAIL,
  payload: error,
});




