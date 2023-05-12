import {
	ADD_USERS_FAIL,
	ADD_USERS_SUCCESS,
	DELETE_USERS_FAIL,
	DELETE_USERS_SUCCESS,
	GET_USERS,
	GET_USERS_FAIL,
	GET_USERS_SUCCESS,
	GET_USERS_TABLE_COLUMN_NAMES_FAIL,
	GET_USERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_USERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_USERS_SUCCESS,
	UPDATE_USERS_FAIL,
	UPDATE_USERS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	users: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const users = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedElections;
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				isLoading: true
			};

		case GET_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
				isLoading: false
			};

		case GET_USERS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_USERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_USERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_USERS_SUCCESS:
			state = {
				...state,
				users: [action.payload.Data[0], ...state.users],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_USERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_USERS_SUCCESS:
			state = {
				...state,
				users: state.users.map((users) =>
					users._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: users
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_USERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_USERS_SUCCESS:
			state = {
				...state,
				users: state.users.filter(
					(users) => users._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_USERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_USERS_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedElections = state.users.map((users) => {
				if (users._id === _id) {
					return {
						...users,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return users;
				}
			});

			toast.success(`Elections ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				users: updatedElections
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_USERS_FAIL:
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

export default users;