import {
	ADD_REFERVOTERS_FAIL,
	ADD_REFERVOTERS_SUCCESS,
	DELETE_REFERVOTERS_FAIL,
	DELETE_REFERVOTERS_SUCCESS,
	GET_REFERVOTERS,
	GET_REFERVOTERS_FAIL,
	GET_REFERVOTERS_SUCCESS,
	GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL,
	GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL,
	ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS,
	UPDATE_REFERVOTERS_FAIL,
	UPDATE_REFERVOTERS_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	refervoters: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const refervoters = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedReferVoters;
	switch (action.type) {
		case GET_REFERVOTERS:
			return {
				...state,
				isLoading: true
			};

		case GET_REFERVOTERS_SUCCESS:
			return {
				...state,
				refervoters: action.payload,
				isLoading: false
			};

		case GET_REFERVOTERS_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_REFERVOTERS_SUCCESS:
			state = {
				...state,
				refervoters: [action.payload.Data[0], ...state.refervoters],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_REFERVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_REFERVOTERS_SUCCESS:
			state = {
				...state,
				refervoters: state.refervoters.map((refervoters) =>
					refervoters._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: refervoters
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_REFERVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_REFERVOTERS_SUCCESS:
			state = {
				...state,
				refervoters: state.refervoters.filter(
					(refervoters) => refervoters._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_REFERVOTERS_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedReferVoters = state.refervoters.map((refervoters) => {
				if (refervoters._id === _id) {
					return {
						...refervoters,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return refervoters;
				}
			});

			toast.success(`ReferVoters ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				refervoters: updatedReferVoters
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL:
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

export default refervoters;