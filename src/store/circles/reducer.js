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
	UPDATE_CIRCLES_SUCCESS,
	GET_CIRCLES_BY_ELECTIONID,
	GET_CIRCLES_BY_ELECTIONID_SUCCESS,
	GET_CIRCLES_BY_ELECTIONID_FAIL
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	circles: [],
	circlesByElectionID: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const circles = (state = INIT_STATE, action) => {
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
				circles: action.payload,
				isLoading: false
			};

		case GET_CIRCLES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_CIRCLES_BY_ELECTIONID:
			return {
				...state,
				isLoading: true
			};

		case GET_CIRCLES_BY_ELECTIONID_SUCCESS:
			return {
				...state,
				circlesByElectionID: action.payload,
				isLoading: false
			};

		case GET_CIRCLES_BY_ELECTIONID_FAIL:
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
				circles: [action.payload.Data[0], ...state.circles],
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
				circles: state.circles.map((circles) =>
					circles._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: circles
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
				circles: state.circles.filter(
					(circles) => circles._id.toString() !== action.payload.Data[0]._id.toString()
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
			updatedCircles = state.circles.map((circles) => {
				if (circles._id === _id) {
					return {
						...circles,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return circles;
				}
			});
	
			toast.success(`Circles ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				circles: updatedCircles
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

export default circles;