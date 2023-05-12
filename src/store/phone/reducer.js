import {
	CHECK_PHONE_NUMBER_FAIL,
	CHECK_PHONE_NUMBER_SUCCESS,
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	phone: [],
	isLoading: false,
	error: {},
};

const phone = (state = INIT_STATE, action) => {
	switch (action.type) {

		case CHECK_PHONE_NUMBER_SUCCESS:
			state = {
				...state,
				phone: action.payload.Data,
			};
			if (action.payload.Success === false) {
				toast.success(action.payload.Message);
			}

			break;

		case CHECK_PHONE_NUMBER_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default phone;