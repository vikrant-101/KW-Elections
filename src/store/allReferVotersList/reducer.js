import {
	GET_ALLREFERVOTERSLIST,
	GET_ALLREFERVOTERSLIST_FAIL,
	GET_ALLREFERVOTERSLIST_SUCCESS,
	GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_FAIL,
	GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_SUCCESS,
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	allrefervoterslist: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const allrefervoterslist = (state = INIT_STATE, action) => {
	let _id, IsActive;
	switch (action.type) {
		case GET_ALLREFERVOTERSLIST:
			return {
				...state,
				isLoading: true
			};

		case GET_ALLREFERVOTERSLIST_SUCCESS:
			return {
				...state,
				allrefervoterslist: action.payload,
				isLoading: false
			};

		case GET_ALLREFERVOTERSLIST_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_ALLREFERVOTERSLIST_TABLE_COLUMN_NAMES_FAIL:
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

export default allrefervoterslist;