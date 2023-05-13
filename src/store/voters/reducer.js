import {
	ADD_VOTERS_FAIL,
	ADD_VOTERS_SUCCESS,
	DELETE_VOTERS_FAIL,
	DELETE_VOTERS_SUCCESS,
	GET_VOTERS,
	GET_VOTERS_FAIL,
	GET_VOTERS_SUCCESS,
	GET_CLASS_VOTERS,
	GET_CLASS_VOTERS_FAIL,
	GET_CLASS_VOTERS_SUCCESS,
	GET_VOTERS_TABLE_COLUMN_NAMES,
	GET_VOTERS_TABLE_COLUMN_NAMES_FAIL,
	GET_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_VOTERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_VOTERS_SUCCESS,
	ON_ACTIVATE_VOTERS_FAIL,
	ON_ACTIVATE_VOTERS_SUCCESS,
	UPDATE_VOTERS_FAIL,
	UPDATE_VOTERS_SUCCESS,
	GET_ARABIC_ALPHABETS,
	GET_ARABIC_ALPHABETS_SUCCESS,
	GET_ARABIC_ALPHABETS_FAIL
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	voters: [],
	columnNames: [],
	alpha:[],
	isLoading: false,
	error: {},
};

const voters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedVoters, Voters_Status;
	switch (action.type) {
		case GET_VOTERS:
			return {
				...state,
				isLoading: true
			};

		case GET_VOTERS_SUCCESS:
			return {
				...state,
				voters: action.payload,
				isLoading: false
			};

		case GET_VOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_CLASS_VOTERS:
			console.log("class voters: ", action)
			return {
				...state,
				isLoading: true
			};

		case GET_CLASS_VOTERS_SUCCESS:
			console.log("class voters success: ", action)
			return {
				...state,
				voters: action.payload,
				isLoading: false
			};

		case GET_CLASS_VOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};
	
		case GET_ARABIC_ALPHABETS:
			return {
				...state,
				isLoading: true
			};

		case GET_ARABIC_ALPHABETS_SUCCESS:
			console.log("alpha reducers: ", action.payload)
			return {
				...state,
				alpha: action.payload,
				isLoading: false
			};

		case GET_ARABIC_ALPHABETS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_VOTERS_TABLE_COLUMN_NAMES:
			console.log("table column voters: ", action)
			return {
				...state,
				isLoading: true
			};
	
		case GET_VOTERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload
			};

		case GET_VOTERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_VOTERS_SUCCESS:
			state = {
				...state,
				voters: [action.payload.Data[0], ...state.voters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_VOTERS_SUCCESS:
			state = {
				...state,
				voters: state.voters.map((voters) =>
					voters._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: voters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_VOTERS_SUCCESS:
			state = {
				...state,
				voters: state.voters.filter(
					(voters) => voters._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case ON_ACTIVATE_DEACTIVATE_VOTERS_SUCCESS:
			_id = action.payload._id;
			Voters_Status = action.payload.Voters_Status;
			updatedVoters = state.voters.map((voters) => {
				if (voters._id === _id) {
					return {
						...voters,
						Voters_Status: !Voters_Status // flip the IsActive value
					};
				} else {
					return voters;
				}
			});
	
			toast.success(`Voters ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				voters: updatedVoters
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			(action.payload.Message)? 
			toast.error(action.payload.Message):
			toast.error(action.payload);
			break;

		case ON_ACTIVATE_VOTERS_SUCCESS:
			_id = action.payload._id;
			Voters_Status = action.payload.Voters_Status;
			updatedVoters = state.voters.map((voters) => {
				if (voters._id === _id) {
					return {
						...voters,
						VotersStatus: true // true the Voters_Status value
					};
				} else {
					return voters;
				}
			});
	
			toast.success(`Voters ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				voters: updatedVoters
			};
			break;
			
		case ON_ACTIVATE_VOTERS_FAIL:
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

export default voters;