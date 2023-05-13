import {
	ADD_BOOTHVOTERS_FAIL,
	ADD_BOOTHVOTERS_SUCCESS,
	DELETE_BOOTHVOTERS_FAIL,
	DELETE_BOOTHVOTERS_SUCCESS,
	GET_BOOTHVOTERS,
	GET_BOOTHVOTERS_FAIL,
	GET_BOOTHVOTERS_SUCCESS,
	GET_CLASS_BOOTHVOTERS,
	GET_CLASS_BOOTHVOTERS_FAIL,
	GET_CLASS_BOOTHVOTERS_SUCCESS,
	GET_BOOTHVOTERS_TABLE_COLUMN_NAMES,
	GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_FAIL,
	GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_SUCCESS,
	ON_ACTIVATE_BOOTHVOTERS_FAIL,
	ON_ACTIVATE_BOOTHVOTERS_SUCCESS,
	UPDATE_BOOTHVOTERS_FAIL,
	UPDATE_BOOTHVOTERS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	boothvoters: [],
	columnNames: [],
	alpha:[],
	isLoading: false,
	error: {},
};

const boothvoters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedBoothVoters, BoothVoters_Status;
	switch (action.type) {
		case GET_BOOTHVOTERS:
			return {
				...state,
				isLoading: true
			};

		case GET_BOOTHVOTERS_SUCCESS:
			return {
				...state,
				boothvoters: action.payload,
				isLoading: false
			};

		case GET_BOOTHVOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_CLASS_BOOTHVOTERS:
			console.log("class boothvoters: ", action)
			return {
				...state,
				isLoading: true
			};

		case GET_CLASS_BOOTHVOTERS_SUCCESS:
			console.log("class boothvoters success: ", action)
			return {
				...state,
				boothvoters: action.payload,
				isLoading: false
			};

		case GET_CLASS_BOOTHVOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_BOOTHVOTERS_TABLE_COLUMN_NAMES:
			console.log("table column boothvoters: ", action)
			return {
				...state,
				isLoading: true
			};
	
		case GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload
			};

		case GET_BOOTHVOTERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_BOOTHVOTERS_SUCCESS:
			state = {
				...state,
				boothvoters: [action.payload.Data[0], ...state.boothvoters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_BOOTHVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_BOOTHVOTERS_SUCCESS:
			state = {
				...state,
				boothvoters: state.boothvoters.map((boothvoters) =>
					boothvoters._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: boothvoters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_BOOTHVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_BOOTHVOTERS_SUCCESS:
			state = {
				...state,
				boothvoters: state.boothvoters.filter(
					(boothvoters) => boothvoters._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_BOOTHVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_SUCCESS:
			_id = action.payload._id;
			BoothVoters_Status = action.payload.BoothVoters_Status;
			updatedBoothVoters = state.boothvoters.map((boothvoters) => {
				if (boothvoters._id === _id) {
					return {
						...boothvoters,
						BoothVoters_Status: !BoothVoters_Status // flip the IsActive value
					};
				} else {
					return boothvoters;
				}
			});
	
			toast.success(`BoothVoters ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				boothvoters: updatedBoothVoters
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_BOOTHVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			(action.payload.Message)? 
			toast.error(action.payload.Message):
			toast.error(action.payload);
			break;

		case ON_ACTIVATE_BOOTHVOTERS_SUCCESS:
			_id = action.payload._id;
			BoothVoters_Status = action.payload.BoothVoters_Status;
			updatedBoothVoters = state.boothvoters.map((boothvoters) => {
				if (boothvoters._id === _id) {
					return {
						...boothvoters,
						BoothVotersStatus: true // true the BoothVoters_Status value
					};
				} else {
					return boothvoters;
				}
			});
	
			toast.success(`BoothVoters ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				boothvoters: updatedBoothVoters
			};
			break;
			
		case ON_ACTIVATE_BOOTHVOTERS_FAIL:
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

export default boothvoters;