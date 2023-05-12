import {
	takeEvery,
	fork,
	put,
	all,
	call,
	throttle
} from "redux-saga/effects";

// Login Redux States
import { CHECK_PHONE_NUMBER } from "./actionTypes";

import { checkPhoneNumberFail, checkPhoneNumberSuccess } from "./actions";

import { checkPhoneNumber } from "../../helpers/fakebackend_helper";


// Fetch Circles 
function* checkPhoneNumberExists({ payload: phone }) {
	try {
		const response = yield call(checkPhoneNumber, phone);
		yield put(checkPhoneNumberSuccess(response));
	} catch (error) {
		yield put(checkPhoneNumberFail(error));
	}
}


export function* watchPhone() {
	yield takeEvery(CHECK_PHONE_NUMBER, checkPhoneNumberExists);
}

function* PhoneSaga() {
	yield all([fork(watchPhone)]);
}

export default PhoneSaga;