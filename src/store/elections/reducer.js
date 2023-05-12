import {
	ADD_ELECTIONS_FAIL,
	ADD_ELECTIONS_SUCCESS,
	DELETE_ELECTIONS_FAIL,
	DELETE_ELECTIONS_SUCCESS,
	GET_ELECTIONS,
	GET_ELECTIONS_FAIL,
	GET_ELECTIONS_SUCCESS,
	GET_ELECTIONS_TABLE_COLUMN_NAMES_FAIL,
	GET_ELECTIONS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_ELECTIONS_FAIL,
	ON_ACTIVATE_DEACTIVATE_ELECTIONS_SUCCESS,
	UPDATE_ELECTIONS_FAIL,
	UPDATE_ELECTIONS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	elections: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const elections = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedElections;
	switch (action.type) {
		case GET_ELECTIONS:
			return {
				...state,
				isLoading: true
			};

		case GET_ELECTIONS_SUCCESS:
			return {
				...state,
				elections: action.payload,
				isLoading: false
			};

		case GET_ELECTIONS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_ELECTIONS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_ELECTIONS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_ELECTIONS_SUCCESS:
			state = {
				...state,
				elections: [action.payload.Data[0], ...state.elections],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_ELECTIONS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_ELECTIONS_SUCCESS:
			state = {
				...state,
				elections: state.elections.map((elections) =>
					elections._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: elections
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_ELECTIONS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_ELECTIONS_SUCCESS:
			state = {
				...state,
				elections: state.elections.filter(
					(elections) => elections._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_ELECTIONS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_ELECTIONS_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedElections = state.elections.map((elections) => {
				if (elections._id === _id) {
					return {
						...elections,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return elections;
				}
			});

			toast.success(`Elections ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				elections: updatedElections
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_ELECTIONS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message);
			break;


		default:
			state = { ...state };
			break;
	}
	return state;
};

export default elections;