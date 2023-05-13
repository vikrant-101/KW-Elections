import {
	ADD_CLASSES_FAIL,
	ADD_CLASSES_SUCCESS,
	DELETE_CLASSES_FAIL,
	DELETE_CLASSES_SUCCESS,
	GET_CLASSES,
	GET_CLASSES_FAIL,
	GET_CLASSES_SUCCESS,
	GET_CLASSES_TABLE_COLUMN_NAMES_FAIL,
	GET_CLASSES_TABLE_COLUMN_NAMES_SUCCESS,
	ON_ACTIVATE_DEACTIVATE_CLASSES_FAIL,
	ON_ACTIVATE_DEACTIVATE_CLASSES_SUCCESS,
	UPDATE_CLASSES_FAIL,
	UPDATE_CLASSES_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
	classes: [],
	columnNames: [],
	isLoading: false,
	error: {},
};

const classes = (state = INIT_STATE, action) => {
	let _id, IsActive, updatedClasses;
	switch (action.type) {
		case GET_CLASSES:
			return {
				...state,
				isLoading: true
			};

		case GET_CLASSES_SUCCESS:
			return {
				...state,
				classes: action.payload,
				isLoading: false
			};

		case GET_CLASSES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_CLASSES_TABLE_COLUMN_NAMES_SUCCESS:
			return {
				...state,
				columnNames: action.payload,
			};

		case GET_CLASSES_TABLE_COLUMN_NAMES_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_CLASSES_SUCCESS:
			state = {
				...state,
				classes: [action.payload.Data[0], ...state.classes],
			};
			toast.success(action.payload.Message);
			break;

		case ADD_CLASSES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload);
			break;

		case UPDATE_CLASSES_SUCCESS:
			state = {
				...state,
				classes: state.classes.map((classes) =>
					classes._id.toString() === action.payload.Data[0]._id.toString()
						? action.payload.Data[0]
						: classes
				),
			};
			toast.success(action.payload.Message);
			break;

		case UPDATE_CLASSES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;

		case DELETE_CLASSES_SUCCESS:
			state = {
				...state,
				classes: state.classes.filter(
					(classes) => classes._id.toString() !== action.payload.Data[0]._id.toString()
				),
			};
			toast.success(action.payload.Message);
			break;

		case DELETE_CLASSES_FAIL:
			state = {
				...state,
				error: action.payload,
			};
			toast.error(action.payload.Message || state.error);
			break;


		case ON_ACTIVATE_DEACTIVATE_CLASSES_SUCCESS:
			_id = action.payload._id;
			IsActive = action.payload.IsActive;
			updatedClasses = state.classes.map((classes) => {
				if (classes._id === _id) {
					return {
						...classes,
						IsActive: !IsActive // flip the IsActive value
					};
				} else {
					return classes;
				}
			});
	
			toast.success(`Classes ${IsActive ? 'deactivated' : 'activated'} successfully`);
			state = {
				...state,
				classes: updatedClasses
			};
			break;
			
		case ON_ACTIVATE_DEACTIVATE_CLASSES_FAIL:
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

export default classes;