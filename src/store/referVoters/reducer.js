import {
	ADD_REFER_VOTERS_FAIL,
	ADD_REFER_VOTERS_SUCCESS,
	DELETE_REFER_VOTERS_FAIL,
	DELETE_REFER_VOTERS_SUCCESS,
	GET_REFER_VOTERS,
	GET_REFER_VOTERS_FAIL,
	GET_REFER_VOTERS_SUCCESS,
	GET_REFER_VOTERS_TABLE_COLUMN_NAMES_FAIL,
	GET_REFER_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_SUCCESS,
	UPDATE_REFER_VOTERS_FAIL,
	UPDATE_REFER_VOTERS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	referVoters: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const referVoters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedCircles;
	switch (action.type) {
		case GET_REFER_VOTERS:
			return {
				...state,
				isLoading: true
			};

		case GET_REFER_VOTERS_SUCCESS:
			return {
				...state,
				referVoters: action.payload,
				isLoading: false
			};

		case GET_REFER_VOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_REFER_VOTERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_REFER_VOTERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_REFER_VOTERS_SUCCESS:
			state = {
				...state,
				referVoters: [action.payload.Data[0], ...state.referVoters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_REFER_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_REFER_VOTERS_SUCCESS:
			state = {
				...state,
				referVoters: state.referVoters.map((referVoters) =>
					referVoters._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: referVoters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_REFER_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_REFER_VOTERS_SUCCESS:
			state = {
				...state,
				referVoters: state.referVoters.filter(
					(referVoters) => referVoters._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_REFER_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedCircles = state.referVoters.map((referVoters) => {
				if (referVoters._id === _id) {
					return {
						...referVoters,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return referVoters;
				}
			});
	
			toast.success(`Circles ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				referVoters: updatedCircles
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_REFER_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			(action.payload.Message)? 
			toast.error(action.payload.Message):
			toast.error(action.payload);
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default referVoters;