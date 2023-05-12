import {
	ADD_CANDIDATES_FAIL,
	ADD_CANDIDATES_SUCCESS,
	DELETE_CANDIDATES_FAIL,
	DELETE_CANDIDATES_SUCCESS,
	GET_CANDIDATES,
	GET_CANDIDATES_FAIL,
	GET_CANDIDATES_SUCCESS,
	GET_CANDIDATES_TABLE_COLUMN_NAMES_FAIL,
	GET_CANDIDATES_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_CANDIDATES_FAIL,
	ON_ACTIVATE_DEACTIVATE_CANDIDATES_SUCCESS,
	UPDATE_CANDIDATES_FAIL,
	UPDATE_CANDIDATES_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	candidates: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const candidates = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedCandidates;
	switch (action.type) {
		case GET_CANDIDATES:
			return {
				...state,
				isLoading: true
			};

		case GET_CANDIDATES_SUCCESS:
			return {
				...state,
				candidates: action.payload,
				isLoading: false
			};

		case GET_CANDIDATES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_CANDIDATES_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_CANDIDATES_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_CANDIDATES_SUCCESS:
			state = {
				...state,
				candidates: [action.payload.Data[0], ...state.candidates],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_CANDIDATES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_CANDIDATES_SUCCESS:
			state = {
				...state,
				candidates: state.candidates.map((candidates) =>
					candidates._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: candidates
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_CANDIDATES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_CANDIDATES_SUCCESS:
			state = {
				...state,
				candidates: state.candidates.filter(
					(candidates) => candidates._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_CANDIDATES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_CANDIDATES_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedCandidates = state.candidates.map((candidate) => {
				if (candidate._id === _id) {
					return {
						...candidate,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return candidate;
				}
			});

			toast.success(`Candidate ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				candidates: updatedCandidates
			};
			break;

		case ON_ACTIVATE_DEACTIVATE_CANDIDATES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			(action.payload.Message) ?
				toast.error(action.payload.Message) :
				toast.error(action.payload);
			break;
		default:
			break;
	}
	return state;
};

export default candidates;