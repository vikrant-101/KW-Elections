import {
	ADD_ROLES_FAIL,
	ADD_ROLES_SUCCESS,
	DELETE_ROLES_FAIL,
	DELETE_ROLES_SUCCESS,
	GET_ROLES,
	GET_ROLES_FAIL,
	GET_ROLES_SUCCESS,
	GET_ROLES_TABLE_COLUMN_NAMES_FAIL,
	GET_ROLES_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_ROLES_FAIL,
	ON_ACTIVATE_DEACTIVATE_ROLES_SUCCESS,
	UPDATE_ROLES_FAIL,
	UPDATE_ROLES_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	roles: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const roles = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedElections;
	switch (action.type) {
		case GET_ROLES:
			return {
				...state,
				isLoading: true
			};

		case GET_ROLES_SUCCESS:
			return {
				...state,
				roles: action.payload,
				isLoading: false
			};

		case GET_ROLES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_ROLES_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_ROLES_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_ROLES_SUCCESS:
			state = {
				...state,
				roles: [action.payload.Data[0], ...state.roles],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_ROLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_ROLES_SUCCESS:
			state = {
				...state,
				roles: state.roles.map((roles) =>
					roles._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: roles
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_ROLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_ROLES_SUCCESS:
			state = {
				...state,
				roles: state.roles.filter(
					(roles) => roles._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_ROLES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_ROLES_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedElections = state.roles.map((roles) => {
				if (roles._id === _id) {
					return {
						...roles,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return roles;
				}
			});

			toast.success(`Elections ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				roles: updatedElections
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_ROLES_FAIL:
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

export default roles;