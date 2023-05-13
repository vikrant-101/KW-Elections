import {
	ADD_CIRCLES_FAIL,
	ADD_CIRCLES_SUCCESS,
	DELETE_CIRCLES_FAIL,
	DELETE_CIRCLES_SUCCESS,
	GET_CIRCLES,
	GET_CIRCLES_FAIL,
	GET_CIRCLES_SUCCESS,
	GET_CIRCLES_TABLE_COLUMN_NAMES_FAIL,
	GET_CIRCLES_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_CIRCLES_FAIL,
	ON_ACTIVATE_DEACTIVATE_CIRCLES_SUCCESS,
	UPDATE_CIRCLES_FAIL,
	UPDATE_CIRCLES_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	myVoters: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const myVoters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedCircles;
	switch (action.type) {
		case GET_CIRCLES:
			return {
				...state,
				isLoading: true
			};

		case GET_CIRCLES_SUCCESS:
			return {
				...state,
				myVoters: action.payload,
				isLoading: false
			};

		case GET_CIRCLES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_CIRCLES_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_CIRCLES_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_CIRCLES_SUCCESS:
			state = {
				...state,
				myVoters: [action.payload.Data[0], ...state.myVoters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_CIRCLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_CIRCLES_SUCCESS:
			state = {
				...state,
				myVoters: state.myVoters.map((myVoters) =>
					myVoters._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: myVoters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_CIRCLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_CIRCLES_SUCCESS:
			state = {
				...state,
				myVoters: state.myVoters.filter(
					(myVoters) => myVoters._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_CIRCLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_CIRCLES_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedCircles = state.myVoters.map((myVoters) => {
				if (myVoters._id === _id) {
					return {
						...myVoters,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return myVoters;
				}
			});
	
			toast.success(`Circles ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				myVoters: updatedCircles
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_CIRCLES_FAIL:
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

export default myVoters;