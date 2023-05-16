import {
	ADD_MY_REFERED_VOTERS_FAIL,
	ADD_MY_REFERED_VOTERS_SUCCESS,
	DELETE_MY_REFERED_VOTERS_FAIL,
	DELETE_MY_REFERED_VOTERS_SUCCESS,
	GET_MY_REFERED_VOTERS,
	GET_MY_REFERED_VOTERS_FAIL,
	GET_MY_REFERED_VOTERS_SUCCESS,
	GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_FAIL,
	GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_SUCCESS,
	UPDATE_MY_REFERED_VOTERS_FAIL,
	UPDATE_MY_REFERED_VOTERS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	myReferedVoters: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const myReferedVoters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedCircles;
	switch (action.type) {
		case GET_MY_REFERED_VOTERS:
			return {
				...state,
				isLoading: true
			};

		case GET_MY_REFERED_VOTERS_SUCCESS:
			return {
				...state,
				myReferedVoters: action.payload,
				isLoading: false
			};

		case GET_MY_REFERED_VOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_MY_REFERED_VOTERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_MY_REFERED_VOTERS_SUCCESS:
			state = {
				...state,
				myReferedVoters: [action.payload.Data[0], ...state.myReferedVoters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_MY_REFERED_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_MY_REFERED_VOTERS_SUCCESS:
			state = {
				...state,
				myReferedVoters: state.myReferedVoters.map((myReferedVoters) =>
					myReferedVoters._id.toString() === action.payload.Data._id.toString()
						? action.payload.Data
						: myReferedVoters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_MY_REFERED_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_MY_REFERED_VOTERS_SUCCESS:
			state = {
				...state,
				myReferedVoters: state.myReferedVoters.filter(
					(myReferedVoters) => myReferedVoters._id.toString() !== action.payload.Data._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_MY_REFERED_VOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedCircles = state.myReferedVoters.map((myReferedVoters) => {
				if (myReferedVoters._id === _id) {
					return {
						...myReferedVoters,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return myReferedVoters;
				}
			});
	
			toast.success(`Circles ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				myReferedVoters: updatedCircles
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_MY_REFERED_VOTERS_FAIL:
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

export default myReferedVoters;