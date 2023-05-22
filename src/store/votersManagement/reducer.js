import {
	ADD_VOTERSMANAGEMENT_FAIL,
	ADD_VOTERSMANAGEMENT_SUCCESS,
	DELETE_VOTERSMANAGEMENT_FAIL,
	DELETE_VOTERSMANAGEMENT_SUCCESS,
	GET_VOTERSMANAGEMENT,
	GET_VOTERSMANAGEMENT_FAIL,
	GET_VOTERSMANAGEMENT_SUCCESS,
	GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_FAIL,
	GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_FAIL,
	ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_SUCCESS,
	UPDATE_VOTERSMANAGEMENT_FAIL,
	UPDATE_VOTERSMANAGEMENT_SUCCESS,
	RESET_VOTERSMANAGEMENT,
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	votersmanagement: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const votersmanagement = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedVotersManagement;
	switch (action.type) {
		case GET_VOTERSMANAGEMENT:
			return {
				...state,
				isLoading: true
			};

		case GET_VOTERSMANAGEMENT_SUCCESS:
			return {
				...state,
				votersmanagement: action.payload,
				isLoading: false
			};

		case GET_VOTERSMANAGEMENT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_VOTERSMANAGEMENT_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_VOTERSMANAGEMENT_SUCCESS:
			state = {
				...state,
				votersmanagement: [action.payload.Data[0], ...state.votersmanagement],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_VOTERSMANAGEMENT_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_VOTERSMANAGEMENT_SUCCESS:
			state = {
				...state,
				votersmanagement: state.votersmanagement.map((votersmanagement) =>
					votersmanagement._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: votersmanagement
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_VOTERSMANAGEMENT_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_VOTERSMANAGEMENT_SUCCESS:
			state = {
				...state,
				votersmanagement: state.votersmanagement.filter(
					(votersmanagement) => votersmanagement._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_VOTERSMANAGEMENT_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedVotersManagement = state.votersmanagement.map((votersmanagement) => {
				if (votersmanagement._id === _id) {
					return {
						...votersmanagement,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return votersmanagement;
				}
			});

			toast.success(`VotersManagement ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				votersmanagement: updatedVotersManagement
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_VOTERSMANAGEMENT_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message);
			break;
		
		case RESET_VOTERSMANAGEMENT:
			return {
				...state,
				votersmanagement: [],
				isLoading: false
			};

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default votersmanagement;